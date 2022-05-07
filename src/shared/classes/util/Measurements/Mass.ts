import { MetricUnits } from "../../../consts/Enums";
import { Speed } from "./Speed";

export class Mass
{
	constructor (PrefixOfValues: MetricUnits, Weight: number)
	{
		this.Units = PrefixOfValues;
		this.Weight = Weight;
	}

	Units: MetricUnits;

	Weight: number;

	static ConvertMassToOtherUnit (NewUnit: MetricUnits, A: Mass): Mass
	{
		let MAtBase = new Mass(MetricUnits.Base, A.Weight * A.Units);
		return new Mass(NewUnit, MAtBase.Weight / NewUnit);
	}

	/**
	 * Read param descriptions.
	 * @param Units
	 * @param A This parameter is expected to have already been converted to the same units as the speed at one mass.
	 * @param SpeedAtOneMass This parameter is expected to have already been converted to the same units as the given mass.
	 */
	static GetSpeedPotential (Units: MetricUnits, A: Mass, SpeedAtOneMass: Speed): Speed
	{
		return new Speed(Units, SpeedAtOneMass.MaxVelocityInOneSecond * (1000 / A.Weight));
	}
}