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
        this.MapData = this.GetMapData() ?? error("No map data.");
        this.TerrainHelper = new TerrainHelper(this.MapData, AllBiomes, FallbackBiome, ModelSize);
    }

    MapData: TerrainRequest;

    TerrainHelper: TerrainHelper;

    AlreadyRendered: TerrainResult[] = [];

    GetMapData (): TerrainRequest | undefined
    {
        let MapData = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetMapData, undefined));
        return MapData.Returned;
	}

    RenderTerrain (Req: ServerTerrainRequest, ChunkSize: number = 50, WorkerCount: number = 10): RenderTerrainResult | undefined
    {
        let Threads: thread[] = [];
        let Thr = coroutine.create(() =>
        {
            for (let BufferedX = Req.XPoint; BufferedX < Req.XToPoint; BufferedX += ChunkSize)
            {
                for (let BufferedZ = Req.ZPoint; BufferedZ < Req.ZToPoint; BufferedZ += ChunkSize)
                {
                    let ChunkRequest = this.MakeRequest<TerrainResult[]>(new ServerRequest<ServerTerrainRequest>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetChunkOfTerrain,
                        new ServerTerrainRequest(BufferedX, BufferedZ, BufferedX + ChunkSize, BufferedZ + ChunkSize, this.MapData.SizePerCell)));
                    if (ChunkRequest.Success && ChunkRequest.Returned !== undefined)
                    {
                        let Chunk = ChunkRequest.Returned;
                        for (let CellIndex = 0; CellIndex < Chunk.size(); CellIndex++)
                        {
                            let Cell = Chunk[CellIndex];
                            let RenderedCell = this.AlreadyRendered.find(V => V.X === BufferedX && V.Z === BufferedZ);
                            if (RenderedCell !== undefined)
                            {
                                print("Already rendered!");
                                Chunk.remove(CellIndex);
                            }
                        }
                        this.TerrainHelper.FillTerrainByBiome(Chunk, WorkerCount);
                        Chunk.forEach(Cell =>
                        {
                            this.AlreadyRendered.push(Cell);
                        });
                    }
                }
            }
        });
        Threads.push(Thr);
        if (Threads !== undefined)
        {
            return new RenderTerrainResult(Threads);
        }
    }
}