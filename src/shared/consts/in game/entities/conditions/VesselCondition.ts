import { ConditionEntry } from "../../../../classes/in game/entities/conditions/ConditionEntry";
import { EntityCondition } from "../../../../classes/in game/entities/conditions/EntityCondition";

export class VesselCondition extends EntityCondition
{
	constructor ()
	{
		super(false, VesselConditionEntries.GetEntries());
	}
}

class VesselConditionEntries
{
	static GetEntries (): ConditionEntry[]
	{
		return [new ConditionEntry("Movement", 1)];
	}
}