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

const THelper: TerrainHelper | undefined = new TerrainHelper(new TerrainRequest(ServerData.TerrainData.EleMap, ServerData.TerrainData.MoistureMap, ServerData.TerrainData.Scale, 3), AllBiomes, FallbackBiome, ModelSize, new Sleep(50000));

let Terrain = THelper.GetTerrain(-(ServerData.TerrainData.Size / 2), -(ServerData.TerrainData.Size / 2), ServerData.TerrainData.Size / 2, ServerData.TerrainData.Size / 2);
//THelper.PaintObjectsByBiome(Terrain);


export { };