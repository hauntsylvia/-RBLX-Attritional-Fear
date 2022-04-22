import { FoAFaction } from "shared/classes/in game/factions/Faction";
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
import { AllBiomes, FallbackBiome, ModelSize } from "../../../shared/consts/Biomes";
import { RenderTerrainResult } from "../processor results/RenderTerrainResult";
import { Processor } from "./Processor";

export class TerrainProcessor extends Processor
{
    constructor (Instance: RemoteFunction)
    {
        super(Instance);
        this.MapData = this.GetMapData();
        this.TerrainHelper = new TerrainHelper(this.MapData, AllBiomes, FallbackBiome, ModelSize);
    }

    MapData: TerrainRequest;

    TerrainHelper: TerrainHelper;

    KillThreads: boolean = false;

    GetMapData (): TerrainRequest
    {
        wait(5);
        let MapData = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetMapData, undefined));
        return MapData.Returned ?? this.GetMapData();
    }

    StopCurrentRendering ()
    {
        this.KillThreads = true;
	}

    RenderTerrain (Req: ServerTerrainRequest, ChunkSize: number)
    {
        this.KillThreads = false;
        let S = new ServerTerrainRequest(Req.XPoint, Req.ZPoint, Req.XToPoint, Req.ZToPoint, this.MapData.SizePerCell);
        for (let BufferedX = S.XPoint; BufferedX <= S.XToPoint; BufferedX += ChunkSize)
        {
            for (let BufferedZ = S.ZPoint; BufferedZ <= S.ZToPoint; BufferedZ += ChunkSize)
            {
                if (!this.KillThreads)
                {
                    let CachedTerrain = this.TerrainHelper.GetTerrain(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize);
                    let Thr = this.TerrainHelper.GetThreadsForTerrainFilling(CachedTerrain);
                    Thr.forEach(T =>
                    {
                        coroutine.resume(T);
                        game.GetService("RunService").Heartbeat.Wait();
                    });
                }
            }
        }
    }
}