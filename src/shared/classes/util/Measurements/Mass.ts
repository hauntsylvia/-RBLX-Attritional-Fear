import { MetricUnits, TimeUnits } from "../../../consts/Enums";
import { Rate } from "./Rate";

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
		return new Mass(NewUnit, MAtBase.Weight !== 0 ? MAtBase.Weight / NewUnit : 0);
	}


	static GetSpeedPotential (A: Mass, MaxVelocityAtZeroMass: Rate): Rate
	{
		let UnitRate = Rate.MakeUnit(MaxVelocityAtZeroMass);
		print("Mass Script: " + MetricUnits[UnitRate.DistanceUnits]);
		print("Mass Script: " + UnitRate.DistanceValue);
		print("Mass Script: " + TimeUnits[UnitRate.TimeUnit]);
		print("Mass Script: " + UnitRate.TimeValue);
		let Weight = (A.Weight !== 0 ? A.Weight : 1);
		let MaxVel = UnitRate.DistanceValue * (1000 / Weight);
		let ToRet = new Rate(MaxVel, UnitRate.DistanceUnits, 1, UnitRate.TimeUnit);
		return Rate.MakeUnit(ToRet);
	}
}