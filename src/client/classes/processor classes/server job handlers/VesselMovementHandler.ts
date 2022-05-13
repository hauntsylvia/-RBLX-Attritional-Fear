import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications, Species } from "../../../../shared/consts/Enums";
import { FoAClient } from "../../clients/FoAClient";
import { ServerJobHandler } from "./ServerJobHandler";

export class VesselMovementHandler extends ServerJobHandler<[number, Vector3]>
{
	constructor (Client: FoAClient)
	{
		super((A) => this.UpdatePosition(A), ServerJobSpecifications.VesselMove);
		this.ClientReference = Client;
	}

	ClientReference: FoAClient;

	UpdatePosition (A: ServerJob<Partial<[number, Vector3]>>)
	{
		print("Vessel position needs to be updated.");
		if (A.Returned !== undefined && A.Returned[0] !== undefined)
		{
			let VesselId = A.Returned[0];
			let VesselSent: Vessel | undefined;
			this.ClientReference.PlayerProcessor.KnownFactions.forEach(Faction =>
			{
				Faction.Entities.forEach(Entity =>
				{
					if (Entity.Id === VesselId && Entity.EntitySpecies === Species[Species.Vessel])
					{
						VesselSent = Entity as Vessel;
					}
				});
			});
			if (VesselSent !== undefined && A.Returned[1] !== undefined)
			{
				Vessel.MoveVesselTo(VesselSent, A.Returned[1]);
			}
		}
	}
}