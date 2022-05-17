import { ConditionEntry } from "./ConditionEntry";

export class EntityCondition
{
	constructor (Dead: boolean, ConditionEntries: ConditionEntry[])
	{
		this.Dead = Dead;
		this.ConditionEntries = ConditionEntries;
	}

	Dead: boolean;

	ConditionEntries: ConditionEntry[];
}