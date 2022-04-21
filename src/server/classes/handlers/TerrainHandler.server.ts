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
const THelper = new TerrainHelper(new TerrainRequest(EleMap, MoistureMap, 5, 3), AllBiomes, FallbackBiome, ModelSize);

function GetChunk (Player: Player | undefined, Req: ServerTerrainRequest): TerrainResult[]
{
    let TX = Req.XPoint + EleMap.Height / 2;
    let TZ = Req.ZPoint + EleMap.Width / 2;
    let ToTX = Req.XToPoint + EleMap.Height / 2;
    let ToTZ = Req.ZToPoint + EleMap.Width / 2;
    let Terrain = THelper.GetTerrain(TX, TZ, ToTX, ToTZ,);
    coroutine.resume(coroutine.create(() =>
    {
        THelper.PaintObjectsByBiome(Terrain, 100);
    }));
    return Terrain;
}

function GetMapData (Player: Player): TerrainRequest
{
    return THelper.TerrainReq;
}

const PlayerHandler = new Handler(Strings.TerrainStrings.TerrainHandlerRoute,
    [
        new Endpoint(Strings.TerrainStrings.GetMapData, GetMapData),
        new Endpoint<ServerTerrainRequest, TerrainResult[]>(Strings.TerrainStrings.GetChunkOfTerrain, GetChunk)
    ]);


Server.RegisterHandler(PlayerHandler);

export { };