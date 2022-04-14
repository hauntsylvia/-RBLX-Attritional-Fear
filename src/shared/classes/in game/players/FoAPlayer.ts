import { FoAPlayerSettings } from "./personalizations/FoAPlayerSettings";

export class FoAPlayer
{
    RobloxPlayerInstance: Player;
    FoAPlayerSettings: FoAPlayerSettings;
    constructor (RobloxPlayerInstance: Player, FoAPlayerSettings: FoAPlayerSettings)
    {
        this.RobloxPlayerInstance = RobloxPlayerInstance;
        this.FoAPlayerSettings = FoAPlayerSettings;
    }
}