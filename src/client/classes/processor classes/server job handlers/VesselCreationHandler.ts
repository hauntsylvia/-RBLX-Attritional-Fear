import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { FoAClient } from "../../clients/FoAClient";
import { ServerJobHandler } from "./ServerJobHandler";

export class VesselCreationHandler extends ServerJobHandler<[number, Vessel]>
{
	constructor (Client: FoAClient)
	{
		super((A) => this.RenderNewVessel(A), ServerJobSpecifications.VesselCreated);
		this.ClientReference = Client;
	}

	ClientReference: FoAClient;

	RenderNewVessel (A: ServerJob<[number, Vessel]>)
	{
		let OwneorOfThisVessel = this.ClientReference.PlayerProcessor.KnownFactions.find(F => F.UserId === A.Returned?.[0]);
		if (OwneorOfThisVessel !== undefined)
		{
			if (A.Returned?.[1] !== undefined)
			{
				print("Vessel belonging to " + A.Returned[0] + " pushed.");
				OwneorOfThisVessel.Entities.push(A.Returned[1]);
			}
		}
	}
}