import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { NoiseHelper } from "../../../shared/classes/in game/terrain/NoiseHelper";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { Sleep } from "../../../shared/classes/util/Sleep";
import { SNumbers } from "../../../shared/consts/SNumbers";

export class ServerData
{
    CurrentActiveFactions: FoAFaction[] = new Array<FoAFaction>();
    CurrentActivePlayers: SelfFoAPlayer[] = new Array<SelfFoAPlayer>();
    TerrainData = new ServerTerrainData();
}

class ServerTerrainData
{
    TerrainRequest: TerrainRequest = new TerrainRequest(6000,
        0/*new Random().NextInteger(5, 10 ^ 26)*/,
        0/*new Random().NextInteger(5, 10 ^ 26)*/,
        SNumbers.Terrain.SizePerCell, 0.8);
}