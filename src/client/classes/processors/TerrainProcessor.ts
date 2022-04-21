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
import { AllBiomes, FallbackBiome } from "../../../shared/consts/Biomes";
import { Processor } from "./Processor";

export class TerrainProcessor extends Processor
{
    constructor (Instance: RemoteFunction)
    {
        super(Instance);
    }

    RenderTerrain (Req: ServerTerrainRequest, ChunkSize: number = 50, WorkerCount: number = 10): any
    {
        let TRequest = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetMapData, undefined));
        if (TRequest.Success && TRequest.Returned !== undefined)
        {
            let THelper = new TerrainHelper(TRequest.Returned, AllBiomes, FallbackBiome);
            for (let BufferedX = Req.XPoint; BufferedX < Req.XToPoint; BufferedX += ChunkSize)
            {
                for (let BufferedZ = Req.ZPoint; BufferedZ < Req.ZToPoint; BufferedZ += ChunkSize)
                {
                    let ChunkRequest = this.MakeRequest<TerrainResult[]>(new ServerRequest<ServerTerrainRequest>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetChunkOfTerrain,
                        new ServerTerrainRequest(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize)));
                    if (ChunkRequest.Success && ChunkRequest.Returned !== undefined)
                    {
                        let Chunk = ChunkRequest.Returned;
                        coroutine.resume(coroutine.create(() =>
                        {
                            THelper.FillTerrainByBiome(Chunk, WorkerCount);
                        }));
                    }
                }
            }
		}
    }
}