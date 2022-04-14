import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataSaveResponse } from "../../../shared/classes/server helpers/ServerDataSaveResponse";
import { Processor } from "./Processor";

export class PlayerProcessor extends Processor
{
    constructor (Instance: RemoteFunction)
    {
        super(Instance);
    }

    GetAllPlayers (): ServerResponse<FoAFaction[]>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.GetAllActivePlayerFactions, undefined));
    }

    RegisterFactionToGame (Faction: FoAFaction): ServerResponse<FoAFaction>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.RegisterPlayerFaction, Faction));
    }

    GetCurrentPlayer (): ServerResponse<SelfFoAPlayer>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.GetFoAPlayerFromPlayer, undefined));
    }

    SaveFoAPlayerSettings (SettingsToSave: FoAPlayerSettings): ServerResponse<ServerDataSaveResponse>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.SaveFoAPlayerSettings, SettingsToSave));
	}
}