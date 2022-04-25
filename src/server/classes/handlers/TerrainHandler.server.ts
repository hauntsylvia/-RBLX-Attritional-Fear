import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
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

const THelper: TerrainHelper | undefined = new TerrainHelper(new TerrainRequest(Server.ServerData.TerrainData.EleMap, Server.ServerData.TerrainData.MoistureMap, Server.ServerData.TerrainData.Scale, 3), AllBiomes, FallbackBiome, ModelSize, new Sleep(50000));

function GetChunk (Player: Player | undefined, Req: ServerTerrainRequest): TerrainResult[] | undefined
{
    if (THelper !== undefined)
    {
        let TX = Req.XPoint;
        let TZ = Req.ZPoint;
        let ToTX = Req.XToPoint;
        let ToTZ = Req.ZToPoint;
        let Terrain = THelper.GetTerrain(TX, TZ, ToTX, ToTZ);
        return Terrain;
	}
}

function GetMapData (Player: Player): TerrainRequest | undefined
{
    if (THelper !== undefined)
    {
        return THelper.TerrainReq;
    }
}
const PlayerHandler = new Handler(Strings.TerrainStrings.TerrainHandlerRoute,
    [
        new Endpoint(Strings.TerrainStrings.GetMapData, GetMapData),
        new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.TerrainStrings.GetChunkOfTerrain, GetChunk)
    ]);


Server.RegisterHandler(PlayerHandler);

let Terrain = THelper.GetTerrain(-(Server.ServerData.TerrainData.Size / 2), -(Server.ServerData.TerrainData.Size / 2), Server.ServerData.TerrainData.Size / 2, Server.ServerData.TerrainData.Size / 2);
THelper.PaintObjectsByBiome(Terrain);


export { };