import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { InterfacingObjectsProcessor } from "./InterfacingObjectsProcessor";
import { Processor } from "./Processor";

export class ServerJobProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction, APIReplicator: RemoteEvent)
    {
        super(APIInstance, APIReplicator);
    }

    GetAllPlayers (): ServerResponse<FoAFaction[]>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.GetAllActivePlayerFactions, undefined));
    }
}