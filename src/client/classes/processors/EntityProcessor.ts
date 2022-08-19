import { Entity } from "../../../shared/classes/in game/entities/implementations/Entity";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerRequest } from "../../../shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "../../../shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";
import { ISettingsInvolved } from "../clients/ISettingsInvolved";
import { Processor } from "./Processor";

export class EntityProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
    }

    GetEntityById (Id: number): ServerResponse<Partial<Entity>>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.Endpoints.EntityStrings.EntityHandlerRoute, Strings.Endpoints.EntityStrings.GetEntityById, Id));
    }
}