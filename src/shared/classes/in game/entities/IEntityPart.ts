import { EntityDamageEvent } from "./EntityDamageEvent";

export interface IEntityPart
{
	/** Examples: left lung, fuel feed, brain */
	readonly Name: string;
	readonly Description: string;
	readonly EntityDamageEvents: EntityDamageEvent[];
}