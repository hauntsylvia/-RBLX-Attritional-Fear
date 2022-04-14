import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";

export class ServerData
{
    CurrentActiveFactions: FoAFaction[] = new Array<FoAFaction>();
    CurrentActivePlayers: FoAPlayer[] = new Array<FoAPlayer>();
}