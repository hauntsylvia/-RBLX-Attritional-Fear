import { Entity } from "../../../../shared/classes/in game/entities/Entity";
import { FoAFaction } from "../../../../shared/classes/in game/factions/Faction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { Strings } from "../../../../shared/consts/Strings";
import { Endpoint } from "../../server communication/Endpoint";
import { ServerData } from "../../server communication/ServerData";
import { IHandler } from "../Handler";

export class EntitiesHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.EntityStrings.EntityHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
        [
            new Endpoint<any, Entity | undefined>(Strings.ServerAPIStrings.EntityStrings.GetEntityById, (Player: Player, PlayerWantsToFind: number) => this.GetEntityById(Player, PlayerWantsToFind)),
        ];

    ServerData!: ServerData;

    GetEntityById (Player: Player, PlayerWantsToFind: number): Entity | undefined
    {
        this.ServerData.CurrentActiveFactions.forEach(F =>
        {
            F.Entities.forEach(Entity =>
            {

            });
        });
        return undefined;
    }

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}