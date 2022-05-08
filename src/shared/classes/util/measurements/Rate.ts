import { MetricUnits, TimeUnits } from "../../../consts/Enums";

export class Rate
{
	constructor (
		DistanceValue: number,
		DistanceUnit: MetricUnits,

		TimeValue: number,
		TimeUnit: TimeUnits)
	{
		this.DistanceValue = DistanceValue; // 100
		this.DistanceUnits = DistanceUnit;	  // km

		this.TimeValue = TimeValue; // 5
		this.TimeUnit = TimeUnit;	  // hours
	}

	DistanceValue: number;
	DistanceUnits: MetricUnits;
	// ^ per v
	TimeValue: number;
	TimeUnit: TimeUnits;

	/** Returns a unit rate. x:1, "x per one" */
	static MakeUnit (R: Rate): Rate
	{
		return new Rate(
			R.DistanceValue / R.TimeValue,
			R.DistanceUnits,

			1,
			R.TimeUnit
		);
	}

	static Convert (DistanceUnits: MetricUnits, _TimeUnits: TimeUnits, A: Rate): Rate
	{
		let BaseRate = new Rate(A.DistanceValue * A.DistanceUnits, MetricUnits.Base, A.TimeValue * A.TimeUnit, TimeUnits.Second);
		return new Rate(BaseRate.DistanceValue / DistanceUnits, DistanceUnits, BaseRate.TimeValue / _TimeUnits, _TimeUnits);
	}
}