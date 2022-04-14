import { FactionTitleKeys } from "../../../consts/Strings";
import { FoAPlayer } from "../players/FoAPlayer";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";

export class FoAFaction
{
    Player: FoAPlayer;
    Name: string;
    Title: FactionTitleKeys;
    Color: Color3;
    constructor (Player: SelfFoAPlayer, Name: string, Title: FactionTitleKeys, Color: Color3)
    {
        this.Player = Player;
        this.Name = Name;
        this.Title = Title;
        this.Color = Color;
    }
}