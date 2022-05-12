import { Geometry } from "../../util/measurements/Geometry";
import { EntityDamageEvent } from "./EntityDamageEvent";

export interface IEntityPart
{
	/** Examples: left lung, engine, brain */
	readonly Name: string;

	readonly Description: string;

	/** Examples: VesselEngine12Cylinder*/
	readonly ModelName?: string;

	readonly EntityDamageEvents: EntityDamageEvent[];

	readonly Geometry: Geometry;
}