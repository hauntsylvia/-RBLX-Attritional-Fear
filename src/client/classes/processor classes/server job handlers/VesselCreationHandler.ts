import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { FoAClient } from "../../clients/FoAClient";
import { ServerJobHandler } from "./ServerJobHandler";

export class VesselCreationHandler extends ServerJobHandler<Vessel>
{
	constructor (Client: FoAClient)
	{
		print("Created.");
		super((A) => this.RenderNewVessel(A), ServerJobSpecifications.VesselCreated);
		this.ClientReference = Client;
	}

	ClientReference: FoAClient;

	RenderNewVessel (A: ServerJob<Partial<Vessel>>)
	{
		print("New vessel information!");
	}
}