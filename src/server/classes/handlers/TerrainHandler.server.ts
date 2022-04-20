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
import { Biomes } from "../../../shared/consts/Biomes";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";


let R = new Random();
let Size = 200;
let Z = R.NextInteger(5, 10 ^ 26); //R.NextInteger(1, 10 ^ 6)
let EleMap = new NoiseHelper(Z, Size, Size, 1.5);
let MoistureMap = new NoiseHelper(Z, Size, Size, 1);
const THelper = new TerrainHelper(new TerrainRequest(EleMap, MoistureMap, 5, 3));
let Terrain = THelper.GetTerrain(0, 0, Size, Size, Biomes.AllBiomes, Biomes.FallbackBiome, Biomes.ModelSize);

function GetChunk (Player: Player, TerrainR: TerrainRequest): TerrainResult[]
{
    let Ret: TerrainResult[] = [];
    Terrain.forEach(T =>
    {

    });
    return Ret;
}

function GetMapData (Player: Player): TerrainRequest
{
    return THelper.TerrainReq;
}

const PlayerHandler = new Handler(Strings.TerrainStrings.TerrainHandlerRoute,
    [
        new Endpoint(Strings.TerrainStrings.GetMapData, GetMapData),
        new Endpoint<TerrainRequest, TerrainResult[]>(Strings.TerrainStrings.GetChunkOfTerrain, GetChunk),
    ]);


Server.RegisterHandler(PlayerHandler);

export { };