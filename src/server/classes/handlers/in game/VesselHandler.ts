import { FoAFaction } from "../../../../shared/classes/in game/factions/Faction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { Strings } from "../../../../shared/consts/Strings";
import { Endpoint } from "../../server communication/Endpoint";
import { ServerData } from "../../server communication/ServerData";
import { IHandler } from "../Handler";

export class VesselHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.VesselHandlerStrings.VesselHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
        [
            new Endpoint<any, Vessel | undefined>(Strings.ServerAPIStrings.VesselHandlerStrings.TryToMakeVessel, (Player: Player, PlayerWantsToMake: Vessel) => this.TryToMakeAVessel(Player, PlayerWantsToMake)),
        ];

    ServerData!: ServerData;

    TryToMakeAVessel (Player: Player, PlayerWantsToMake: Vessel): Vessel | undefined
    {
        let F: FoAFaction | undefined = this.ServerData.CurrentActiveFactions.find(X => X.UserId === Player.UserId);
        if (F !== undefined)
        {

        }
        return undefined;
    }

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}