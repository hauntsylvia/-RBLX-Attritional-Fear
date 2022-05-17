import { SelfFoAFaction } from "../../../../shared/classes/in game/factions/implementations/SelfFoAFaction";
import { FoAFaction } from "../../../../shared/classes/in game/factions/interfaces/FoAFaction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { BuildingTypes, ServerJobSpecifications, Species } from "../../../../shared/consts/Enums";
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
            new Endpoint<any, Vessel | undefined>(Strings.ServerAPIStrings.VesselHandlerStrings.TryToMakeVessel, (Player: Player, BuildingIdPlayerRequestedVessel: [number, Vessel], Replicator: Replicator) => this.TryToMakeAVessel(Player, BuildingIdPlayerRequestedVessel, Replicator)),
            new Endpoint<any, boolean>(Strings.ServerAPIStrings.VesselHandlerStrings.TryToMoveAVessel, (Player: Player, IdAndMoveToAndThrottles: [number, Vector3, number], Replicator: Replicator) => this.TryToMoveAVessel(Player, IdAndMoveToAndThrottles, Replicator)),
        ];

    ServerData!: ServerData;

    TryToMakeAVessel (Player: Player, BuildingIdPlayerRequestedVessel: [number, Vessel], Replicator: Replicator): Vessel | undefined
    {
        let F: FoAFaction | undefined = this.ServerData.CurrentActiveFactions.find(X => X.UserId === Player.UserId);
        if (F !== undefined)
        {
            let BId = BuildingIdPlayerRequestedVessel[0];
            let B = F.Buildings.find(B => B.BuildingType === BuildingTypes.VesselManufacturingFacility && B.Id === BId);
            if (B !== undefined)
            {
                let V = BuildingIdPlayerRequestedVessel[1];
                let PlayerRefinedVessel = new Vessel(undefined, V.EntityName, V.VesselPartsSpecifically, V.Crew, B.Origin);
                F.Entities.push(PlayerRefinedVessel);
                this.ServerData.CurrentActiveFactions.forEach(ActiveFaction =>
                {
                    let ActiveFactionAsSelf = ActiveFaction as SelfFoAFaction;
                    let IsVisible = EntityMapper.IsEntityVisibleToFaction(ActiveFactionAsSelf, PlayerRefinedVessel);

                    if (IsVisible)
                    {
                        Replicator.SendToClient([Player], new ServerJob<[number, Vessel]>(ServerJobSpecifications.VesselCreated, [Player.UserId, PlayerRefinedVessel]));
                    }
                });
                return PlayerRefinedVessel;
			}
        }
        return undefined;
    }

    TryToMoveAVessel (Player: Player, IdAndMoveToAndThrottles: [number, Vector3, number], Replicator: Replicator): boolean | undefined
    {
        let F: SelfFoAFaction | undefined = this.ServerData.CurrentActiveFactions.find(X => X.UserId === Player.UserId);
        if (F !== undefined)
        {
            let VA: Vessel[] = F.Entities.filter(E => E.EntitySpecies === Species[Species.Vessel] && E.Id === IdAndMoveToAndThrottles[0]) as Vessel[];
            if (VA.size() > 0)
            {
                let V = VA[0];
                this.ServerData.CurrentActiveFactions.forEach(Faction =>
                {
                    if (EntityMapper.IsEntityVisibleToFaction(Faction as SelfFoAFaction, V))
                    {
                        if (Faction.Player !== undefined)
                        {
                            Replicator.SendToClient([Faction.Player.RobloxPlayerInstance], new ServerJob<[number, Vector3, number]>(ServerJobSpecifications.VesselMove, IdAndMoveToAndThrottles));
                        }
                        else
                        {
                            print("No player?");
                        }
                    }
                    else
                    {
                        print("Vessel not visible to " + Faction.UserId);
                    }
                });
                return true;
            }
            else
            {
                print("No vessels available to move for the player of id " + Player.UserId);
            }
        }
        else
        {
            print("Player has no faction but tried to move a vessel!");
            Player.Kick("come on . . .");
		}
        return false;
	}

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}