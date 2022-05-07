import { MetricPrefixes } from "../../../consts/Enums";
import { Speed } from "./Speed";

export class Mass
{
	constructor (PrefixOfValues: MetricPrefixes, Weight: number)
	{
		this.Units = PrefixOfValues;
		this.Weight = Weight;
	}

	Units: MetricPrefixes;

	Weight: number;

	static ConvertMassToOtherUnit (NewUnit: MetricPrefixes, A: Mass): Mass
	{
		let MAtBase = new Mass(MetricPrefixes.Base, A.Weight * A.Units);
		return new Mass(NewUnit, MAtBase.Weight / NewUnit);
	}

	/**
	 * Read param descriptions.
	 * @param Units
	 * @param A This parameter is expected to have already been converted to the same units as the speed at one mass.
	 * @param SpeedAtOneMass This parameter is expected to have already been converted to the same units as the given mass.
	 */
	static GetSpeedPotential (Units: MetricPrefixes, A: Mass, SpeedAtOneMass: Speed): Speed
	{
		return new Speed(Units, SpeedAtOneMass.MaxVelocityInOneSecond * (1000 / A.Weight));
	}
}