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


let R = new Random();
let Size = 1200;
let Z = R.NextInteger(5, 10 ^ 26);
let EleMap = new NoiseHelper(Z, Size, Size, 2, 5);
let MoistureMap = new NoiseHelper(Z, Size, Size, 12, 2);
let Scale = 10;

function GetChunk (Player: Player | undefined, Req: ServerTerrainRequest): TerrainResult[] | undefined
{
    if (THelper !== undefined)
    {
        let TX = Req.XPoint;
        let TZ = Req.ZPoint;
        let ToTX = Req.XToPoint;
        let ToTZ = Req.ZToPoint;
        let Terrain = THelper.GetCachedTerrain(TX, TZ, ToTX, ToTZ);
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

const THelper: TerrainHelper | undefined = new TerrainHelper(new TerrainRequest(EleMap, MoistureMap, Scale, 3), AllBiomes, FallbackBiome, ModelSize);

coroutine.resume(coroutine.create(() =>
{
    THelper.PaintObjectsByBiome(THelper.Terrain);
}));


export { };