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

    GetMapData (): TerrainRequest
    {
        wait(1);
        let MapData = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetMapData, undefined));
        return MapData.Returned ?? this.GetMapData();
    }


    RenderTerrain (Req: ServerTerrainRequest, ChunkSize: number = 50, WorkerCount: number = 10): RenderTerrainResult | undefined
    {
        let ToReturn = new RenderTerrainResult([]);
        let Threads: thread[] = [];
        let Thr = coroutine.create(() =>
        {
            for (let BufferedX = Req.XPoint; BufferedX < Req.XToPoint; BufferedX += ChunkSize)
            {
                for (let BufferedZ = Req.ZPoint; BufferedZ < Req.ZToPoint; BufferedZ += ChunkSize)
                {
                    if (!ToReturn.ThreadsKilled)
                    {
                        //let ChunkRequest = this.MakeRequest<TerrainResult[]>(new ServerRequest<ServerTerrainRequest>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetChunkOfTerrain,
                        //    new ServerTerrainRequest(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize, this.MapData.SizePerCell)));
                        //print(ChunkRequest.Returned?.size());
                        //coroutine.resume(coroutine.create(() =>
                        //{
                        //    if (ChunkRequest.Success && ChunkRequest.Returned !== undefined)
                        //    {
                        //        let Chunk = ChunkRequest.Returned;
                        //        this.TerrainHelper.FillTerrainByBiome(Chunk, WorkerCount);
                        //    }
                        //}));
                        this.TerrainHelper.FillTerrainByBiome(this.TerrainHelper.GetCachedTerrain(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize), WorkerCount);
					}
                }
            }
        });
        Threads.push(Thr);
        ToReturn.Threads = Threads;
        return ToReturn;
    }
}