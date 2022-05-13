import { FoAFaction } from "../../../../shared/classes/in game/factions/Faction";
import { SelfFoAFaction } from "../../../../shared/classes/in game/factions/SelfFoAFaction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { Strings } from "../../../../shared/consts/Strings";
import { Replicator } from "../../client communication/Replicator";
import { EntityMapper } from "../../modules/entities/EntityMapper";
import { Endpoint } from "../../server communication/Endpoint";
import { ServerData } from "../../server communication/ServerData";
import { IHandler } from "../Handler";

export class VesselHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.VesselHandlerStrings.VesselHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
        [
            new Endpoint<any, Vessel | undefined>(Strings.ServerAPIStrings.VesselHandlerStrings.TryToMakeVessel, (Player: Player, PlayerWantsToMake: Vessel, Replicator: Replicator) => this.TryToMakeAVessel(Player, PlayerWantsToMake, Replicator)),
        ];

    ServerData!: ServerData;

    TryToMakeAVessel (Player: Player, PlayerWantsToMake: Vessel, Replicator: Replicator): Vessel | undefined
    {
        print("Making a vessel . . .");
        let F: FoAFaction | undefined = this.ServerData.CurrentActiveFactions.find(X => X.UserId === Player.UserId);
        if (F !== undefined)
        {
            let PlayerRefinedVessel = new Vessel(undefined, PlayerWantsToMake.EntityName, PlayerWantsToMake.VesselPartsSpecifically, PlayerWantsToMake.Crew);
            F.Entities.push(PlayerRefinedVessel);
            print("New vessel refined.");
            this.ServerData.CurrentActiveFactions.forEach(ActiveFaction =>
            {
                print("Passing " + ActiveFaction.Name + " faction.");

                let ActiveFactionAsSelf = ActiveFaction as SelfFoAFaction;
                let IsVisible = EntityMapper.IsEntityVisibleToFaction(ActiveFactionAsSelf, PlayerRefinedVessel);

                if (IsVisible)
                {
                    print("Is visible to passing faction!");
                    Replicator.SendToClient([Player], new ServerJob<Vessel>(ServerJobSpecifications.VesselCreated, PlayerRefinedVessel));
                }
                else
                {
                    print("Is not visible to passing faction!");
				}
            });
            return PlayerRefinedVessel;
        }
        return undefined;
    }

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}