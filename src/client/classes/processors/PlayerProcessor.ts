import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { InterfacingObjectsProcessor } from "./InterfacingObjectsProcessor";
import { Processor } from "./Processor";

export class PlayerProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
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

    SaveFoAPlayerSettings (SettingsToSave: FoAPlayerSettings, HandlingProcessor: InterfacingObjectsProcessor): ServerResponse<ServerDataOperationResponse>
    {
        HandlingProcessor.ChangedSettings(SettingsToSave);
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.SaveFoAPlayerSettings, SettingsToSave));
	}
}