import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Registers } from "../../../shared/consts/Registers";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { NoiseHelper } from "../../../shared/classes/in game/terrain/NoiseHelper";
import { TerrainHelper } from "../../../shared/classes/in game/terrain/TerrainHelper";
import { AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize } from "../../../shared/consts/Biomes";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";
import { ServerTerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { ServerData } from "../server communication/ServerData";
import { Sleep } from "../../../shared/classes/util/Sleep";
import { SNumbers } from "../../../shared/consts/SNumbers";
import { IHandler } from "./Handler";

export class TerrainHandler implements IHandler
{
    Name: string = Strings.TerrainStrings.TerrainHandlerRoute;

    Endpoints =
    [
        new Endpoint(Strings.TerrainStrings.GetMapData, (Player: Player, Arg: unknown) => this.GetMapData(Player)),
        new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.TerrainStrings.GetChunkOfTerrain, (Player: Player, Arg: ServerTerrainRequest) => this.GetChunk(Player, Arg))
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
        this.Terrain = this.THelper.GetTerrain(-500, -500, 500, 500);
        coroutine.resume(coroutine.create(() =>
        {
            //let Sleeper = new Sleep(10);
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