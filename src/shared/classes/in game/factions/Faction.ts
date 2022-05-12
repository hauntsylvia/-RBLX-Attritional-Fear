import { FactionTitleKeys } from "../../../consts/Strings";
import { FoAPlayer } from "../players/FoAPlayer";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";

export interface FoAFaction
{
    Player?: FoAPlayer;

    UserId: number;

    Name: string;

    SpawnLocation: Vector3;

    Title: FactionTitleKeys;

    Color: Color3;
}