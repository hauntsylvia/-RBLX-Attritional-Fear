import { Faction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";

export class ServerData
{
    CurrentActiveFactions: Faction[] = new Array<Faction>();
    CurrentActivePlayers: FoAPlayer[] = new Array<FoAPlayer>();
}