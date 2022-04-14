import { FoAPlayer } from "./FoAPlayer";
import { FoAPlayerSettings } from "./personalizations/FoAPlayerSettings";

export class SelfFoAPlayer extends FoAPlayer
{
    FoAPlayerSettings: FoAPlayerSettings;
    constructor (RobloxPlayerInstance: Player, Settings: FoAPlayerSettings)
    {
        super(RobloxPlayerInstance);
        this.FoAPlayerSettings = Settings;
    }
}