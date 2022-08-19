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
            new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.Endpoints.TerrainStrings.GetChunkOfTerrain, (Player: Player, Arg: ServerTerrainRequest) => this.GetChunk(Player, Arg))
    ]

    THelper!: TerrainHelper;

    Terrain!: TerrainResult[];

    GetChunk (Player: Player | undefined, Req: ServerTerrainRequest): TerrainResult[] | undefined
    {
        if (this.THelper !== undefined)
        {
            let TX = Req.XPoint;
            let TZ = Req.ZPoint;
            let ToTX = Req.XToPoint;
            let ToTZ = Req.ZToPoint;
            let Terrain = this.THelper.GetTerrain(TX, TZ, ToTX, ToTZ);
            return Terrain;
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
        this.Terrain = this.THelper.GetTerrain(-200, -200, 200, 200);
        coroutine.resume(coroutine.create(() =>
        {
            //let Sleeper = new Sleep(5);
            //let Ts = this.THelper.GetThreadsForTerrainFilling(this.Terrain);
            //Ts.forEach(T =>
            //{
            //    coroutine.resume(T);
            //    Sleeper.Step();
            //});
            this.THelper.PaintObjectsByBiome(this.Terrain);
        }));
    }
}