import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { ServerJobHandler } from "./ServerJobHandler";

export class VesselMovementHandler extends ServerJobHandler<[number, Vector2]>
{
	constructor ()
	{
		super((A) => this.UpdatePosition(A), ServerJobSpecifications.VesselMove);
	}

	UpdatePosition (A: ServerJob<Partial<[number, Vector2]>>)
	{

	}
}