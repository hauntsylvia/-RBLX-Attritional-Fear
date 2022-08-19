import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerTerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";
import { TerrainHelper } from "../../../shared/classes/in game/terrain/TerrainHelper";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Sleep } from "../../../shared/classes/util/Sleep";
import { AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize } from "../../../shared/consts/Biomes";
import { RenderTerrainResult } from "../processor classes/RenderTerrainResult";
import { Processor } from "./Processor";

export class TerrainProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
        this.MapData = this.GetMapData();
        this.TerrainHelper = new TerrainHelper(this.MapData, AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize);
    }

    private MapData: TerrainRequest;

    private TerrainHelper: TerrainHelper;

    private KillThreads: boolean = false;

    public GetMapData (): TerrainRequest
    {
        wait(2);
        let MapData = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.Endpoints.TerrainStrings.TerrainHandlerRoute, Strings.Endpoints.TerrainStrings.GetMapData, undefined));
        return MapData.Returned ?? this.GetMapData();
    }

    public StopCurrentRendering ()
    {
        this.KillThreads = true;
	}

    public RenderTerrain (Req: ServerTerrainRequest, FramesToSkipPerThread: number, ChunkSize: number = 50): RenderTerrainResult
    {
        let Sleeper = new Sleep(FramesToSkipPerThread);
        let Result = new RenderTerrainResult([]);
        this.KillThreads = false;
        let S = new ServerTerrainRequest(Req.XPoint, Req.ZPoint, Req.XToPoint, Req.ZToPoint, this.MapData.SizePerCell);
        this.MakeRequest<any>(new ServerRequest<ServerTerrainRequest>(Strings.Endpoints.TerrainStrings.TerrainHandlerRoute, Strings.Endpoints.TerrainStrings.NotifyServerToPainTerrain, S))
        for (let BufferedX = S.XPoint; BufferedX <= S.XToPoint; BufferedX += ChunkSize)
        {
            BufferedX = BufferedX > BufferedX + ChunkSize ? BufferedX + ChunkSize : BufferedX;
            for (let BufferedZ = S.ZPoint; BufferedZ <= S.ZToPoint; BufferedZ += ChunkSize)
            {
                BufferedZ = BufferedZ > BufferedZ + ChunkSize ? BufferedZ + ChunkSize : BufferedZ;
                if (!this.KillThreads && !Result.ThreadsKilled)
                {
                    let Terrain = this.TerrainHelper.GetTerrain(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize);
                    let Thr = this.TerrainHelper.GetThreadsForTerrainFilling(Terrain);
                    Thr.forEach(T =>
                    {
                        coroutine.resume(T);
                        FramesToSkipPerThread >= 1 ? Sleeper.Step() : game.GetService("RunService").Heartbeat.Wait();
                        Result.Threads.push(T);
                    });
                }
            }
        }
        return Result;
    }
}