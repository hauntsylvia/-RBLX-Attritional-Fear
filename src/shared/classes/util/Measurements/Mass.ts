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
		let BaseA = Mass.ConvertMassToOtherUnit(MetricUnits.Base, A);
		let BaseVel = Rate.Convert(MetricUnits.Base, TimeUnits.Second, MaxVelocityAtZeroMass);
		BaseVel = Rate.MakeUnit(BaseVel);
		let Weight = (BaseA.Weight !== 0 ? BaseA.Weight : 1);
		let MaxVel = BaseVel.DistanceValue / math.pow(Weight, 0.5);
		let BaseReturn = new Rate(MaxVel, BaseVel.DistanceUnits, 1, BaseVel.TimeUnit);
		return Rate.MakeUnit(Rate.Convert(MaxVelocityAtZeroMass.DistanceUnits, MaxVelocityAtZeroMass.TimeUnit, BaseReturn));
	}
}