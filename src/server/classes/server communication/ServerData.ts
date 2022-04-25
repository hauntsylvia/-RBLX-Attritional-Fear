import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { NoiseHelper } from "../../../shared/classes/in game/terrain/NoiseHelper";
import { Sleep } from "../../../shared/classes/util/Sleep";

export class ServerData
{
    CurrentActiveFactions: FoAFaction[] = new Array<FoAFaction>();
    CurrentActivePlayers: SelfFoAPlayer[] = new Array<SelfFoAPlayer>();
    static TerrainData = class ServerTerrainData
    {
        static Size = 1200;
        static Z = new Random().NextInteger(5, 10 ^ 26);
        static EleMap = new NoiseHelper(ServerTerrainData.Z, ServerTerrainData.Size, ServerTerrainData.Size, 2, 5, new Sleep(50000));
        static MoistureMap = new NoiseHelper(ServerTerrainData.Z, ServerTerrainData.Size, ServerTerrainData.Size, 12, 2, new Sleep(50000));
        static Scale = 5;
    }
}