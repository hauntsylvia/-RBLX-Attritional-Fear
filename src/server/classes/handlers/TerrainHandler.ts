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
import { AllBiomes, FallbackBiome, ModelSize } from "../../../shared/consts/Biomes";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";
import { ServerTerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { ServerData } from "../server communication/ServerData";
import { Sleep } from "../../../shared/classes/util/Sleep";
import { SNumbers } from "../../../shared/consts/SNumbers";
import { Handler } from "./Handler";

export class TerrainHandler extends Handler
{
    static __AddToImps = Handler.Implementations.add(new TerrainHandler());
    constructor ()
    {
        super(TerrainHandler.Name, TerrainHandler.Endpoints);
        TerrainHandler.THelper = new TerrainHelper(new TerrainRequest(Server.ServerData.TerrainData.EleMap, Server.ServerData.TerrainData.MoistureMap, Server.ServerData.TerrainData.Scale, 3), AllBiomes, FallbackBiome, ModelSize, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));
        TerrainHandler.Terrain = TerrainHandler.THelper.GetTerrain(-(Server.ServerData.TerrainData.Size / 2), -(Server.ServerData.TerrainData.Size / 2), Server.ServerData.TerrainData.Size / 2, Server.ServerData.TerrainData.Size / 2);
        TerrainHandler.THelper.PaintObjectsByBiome(TerrainHandler.Terrain);
    }

    static Name: string = Strings.TerrainStrings.TerrainHandlerRoute;

    static Endpoints: Endpoint<any, any>[] =
        [
            new Endpoint(Strings.TerrainStrings.GetMapData, (Player: Player, Arg: unknown) => this.GetMapData(Player)),
            new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.TerrainStrings.GetChunkOfTerrain, (Player: Player, Arg: ServerTerrainRequest) => this.GetChunk(Player, Arg))
        ];

    static THelper: TerrainHelper;

    static Terrain: TerrainResult[];

    static GetChunk (Player: Player | undefined, Req: ServerTerrainRequest): TerrainResult[] | undefined
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

    static GetMapData (Player: Player): TerrainRequest | undefined
    {
        if (this.THelper !== undefined)
        {
            return this.THelper.TerrainReq;
        }
    }

    ServerRegistering (Data: ServerData)
    {

    }
}