import { FoAPlayer } from "../players/FoAPlayer";

export class Faction
{
    Player: FoAPlayer;
    Name: string;
    Color: Color3;
    constructor(Player: FoAPlayer, Name: string, Color: Color3)
    {
        this.Player = Player;
        this.Name = Name;
        this.Color = Color;
    }
}