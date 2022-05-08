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
		return new Mass(NewUnit, MAtBase.Weight / NewUnit);
	}


	static GetSpeedPotential (A: Mass, MaxVelocityAtZeroMass: Rate): Rate
	{
		let UnitRate = Rate.MakeUnit(MaxVelocityAtZeroMass);
		let MaxVel = UnitRate.DistanceValue * (1000 / A.Weight);
		return new Rate(MaxVel, UnitRate.DistanceUnits, 1, UnitRate.TimeUnit);
	}
}