import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FactionArguments } from "../../../shared/classes/in game/factions/FactionArguments";
import { OtherFoAFaction } from "../../../shared/classes/in game/factions/OtherFoAFaction";
import { SelfFoAFaction } from "../../../shared/classes/in game/factions/SelfFoAFaction";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { InterfacingObjectsProcessor } from "./InterfacingObjectsProcessor";
import { Processor } from "./Processor";

export class PlayerProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
        let F = this.GetAllPlayers().Returned;
        this.KnownFactions = F !== undefined ? F : [];
    }

    PlayerFaction?: SelfFoAFaction;

    KnownFactions: OtherFoAFaction[];

    GetAllPlayers (): ServerResponse<OtherFoAFaction[]>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.ServerAPIStrings.PlayerStrings.PlayerHandlerRoute, Strings.ServerAPIStrings.PlayerStrings.GetAllActivePlayerFactions, undefined));
    }

    RegisterFactionToGame (Faction: FactionArguments): ServerResponse<SelfFoAFaction>
    {
        let R = this.MakeRequest<SelfFoAFaction>(new ServerRequest<any>(Strings.ServerAPIStrings.PlayerStrings.PlayerHandlerRoute, Strings.ServerAPIStrings.PlayerStrings.RegisterPlayerFaction, Faction));
        if (R.Success && R.Returned !== undefined)
        {
            this.PlayerFaction = R.Returned;
        }
        return R;
    }

    GetCurrentPlayer (): ServerResponse<SelfFoAPlayer>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.ServerAPIStrings.PlayerStrings.PlayerHandlerRoute, Strings.ServerAPIStrings.PlayerStrings.GetFoAPlayerFromPlayer, undefined));
    }

    SaveFoAPlayerSettings (SettingsToSave: FoAPlayerSettings, HandlingProcessor: InterfacingObjectsProcessor): ServerResponse<ServerDataOperationResponse>
    {
        HandlingProcessor.ChangedSettings(SettingsToSave);
        return this.MakeRequest(new ServerRequest<any>(Strings.ServerAPIStrings.PlayerStrings.PlayerHandlerRoute, Strings.ServerAPIStrings.PlayerStrings.SaveFoAPlayerSettings, SettingsToSave));
	}
}