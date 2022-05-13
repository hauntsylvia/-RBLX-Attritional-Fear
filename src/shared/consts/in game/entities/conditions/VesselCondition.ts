import { ConditionEntry } from "../../../../classes/in game/entities/conditions/ConditionEntry";
import { EntityCondition } from "../../../../classes/in game/entities/conditions/EntityCondition";

export class VesselCondition extends EntityCondition
{
	constructor ()
	{
		super(false, []);
		this.ConditionEntries.push(this.MovementEntry);
		this.ConditionEntries.push(this.SightEntry);
	}

	MovementEntry: ConditionEntry = new ConditionEntry("Movement", 1);

	SightEntry: ConditionEntry = new ConditionEntry("External Situational Awareness", 1);
}