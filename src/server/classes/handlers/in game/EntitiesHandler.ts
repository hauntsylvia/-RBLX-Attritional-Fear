import { Entity } from "../../../../shared/classes/in game/entities/Entity";
import { FoAFaction } from "../../../../shared/classes/in game/factions/Faction";
import { SelfFoAFaction } from "../../../../shared/classes/in game/factions/SelfFoAFaction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { Strings } from "../../../../shared/consts/Strings";
import { EntityMapper } from "../../modules/entities/EntityMapper";
import { Endpoint } from "../../server communication/Endpoint";
import { ServerData } from "../../server communication/ServerData";
import { IHandler } from "../Handler";

export class EntitiesHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.EntityStrings.EntityHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
        [
        ];

    ServerData!: ServerData;

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}