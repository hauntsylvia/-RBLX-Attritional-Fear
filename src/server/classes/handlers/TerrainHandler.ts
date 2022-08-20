import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { TerrainHelper } from "../../../shared/classes/in game/terrain/TerrainHelper";
import { AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize } from "../../../shared/consts/Biomes";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";
import { ServerTerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { ServerData } from "../server communication/ServerData";
import { IHandler } from "./Handler";

export class TerrainHandler implements IHandler
{
    Name: string = Strings.Endpoints.TerrainStrings.TerrainHandlerRoute;

    Endpoints =
    [
            new Endpoint(Strings.Endpoints.TerrainStrings.GetMapData, (Player: Player, Arg: unknown) => this.GetMapData(Player)),
            new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.Endpoints.TerrainStrings.NotifyServerToPainTerrain, (Player: Player, Arg: ServerTerrainRequest) => this.PaintChunk(Player, Arg))
    ]

    THelper!: TerrainHelper;

    PaintChunk (Player: Player | undefined, Req: ServerTerrainRequest): undefined
    {
        if (this.THelper !== undefined)
        {
            let TX = Req.XPoint;
            let TZ = Req.ZPoint;
            let ToTX = Req.XToPoint;
            let ToTZ = Req.ZToPoint;
            coroutine.resume(coroutine.create(() =>
            {
                print(`Client asks for server to paint terrain from [${TX}, ${TZ}] to [${ToTX}, ${ToTZ}].`);
                let Terrain = this.THelper.GetTerrain(TX, TZ, ToTX, ToTZ);
                this.THelper.PaintObjectsByBiome(Terrain);
                print(`Paint finished.`);
            }));
            return undefined;
        }
    }

    GetMapData (Player: Player): TerrainRequest | undefined
    {
        if (this.THelper !== undefined)
        {
            return this.THelper.TerrainReq;
        }
    }

    ServerRegistering (Data: ServerData)
    {
        this.THelper = new TerrainHelper(Data.TerrainData.TerrainRequest, AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize);
        
    }
}