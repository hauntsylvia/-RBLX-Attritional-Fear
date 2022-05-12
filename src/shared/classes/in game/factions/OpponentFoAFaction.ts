import { FactionTitleKeys } from "../../../consts/Strings";
import { FoAPlayer } from "../players/FoAPlayer";
import { FoAFaction } from "./Faction";

export class OpponentFoAFaction implements FoAFaction
{
    constructor (Player: FoAPlayer, UserId: number, Name: string, SpawnLoc: Vector3, Title: FactionTitleKeys, Color: Color3)
    {
        this.Player = Player;
        this.UserId = UserId;
        this.Name = Name;
        this.SpawnLocation = SpawnLoc;
        this.Title = Title;
        this.Color = Color;
    }

    Player?: FoAPlayer;

    UserId: number;

    Name: string;

    SpawnLocation: Vector3;

    Title: FactionTitleKeys;

    Color: Color3;
}