export class ConditionEntry
{
	constructor (ConditionName: string, ConditionPercent: number)
	{
		this.ConditionName = ConditionName;
		this.ConditionPercent = ConditionPercent;
	}
	/** examples: movement ability, blood filtration */
	ConditionName: string;
	/** 0 - 1 */
	ConditionPercent: number;
}