import { Entity } from "./Entity";
import { PenetrationForce } from "./forces/PenetrationForce";

export interface IEntityDamageEvent
{
	/** Returns true when this force may be applied. */
	IsActive: boolean;

	/**Examples: liver rupture (crew) . . no fuel input (engine/fuel tank) . . emp (electrical devices) */
	Name: string;

	/** Examples:
	 * . . "The liver of this <species> is unable to efficiently filter."
	 * . . "The fuel feed of this part is unable to deliver fuel."
	 * . . "This device has been disabled due to an emp."
	 * */
	Description: string;

	/** Examples:
	 * . . "Consider bringing this crew member to a hospital for treatment."
	 * . . "Make sure the fuel tank is working and connected."
	 * . . "The crew will auto-restart electrical systems." */
	HelpfulDescription: string;

	/** The minimum value of penetration to activate this event. */
	MinimumPenetrationalForce: PenetrationForce;

	///** Describes the action to apply to the entity when damaged. */
	//WhenDamaged: (E: Entity) => void;

	///** Describes what to do on every tick. Should be wrapped around an OnTick() that returns a boolean and sets the active boolean to true. */
	//OnTick: () => void;
}