import { MetricUnits, TimeUnits } from "../../../consts/Enums";

export class Rate
{
	constructor (
		QuantityOneValue: number,
		QuantityOneRate: MetricUnits,

		QuantityTwoValue: number,
		QuantityTwoRate: TimeUnits)
	{
		this.QuantityOneValue = QuantityOneValue; // 100
		this.QuantityOneRate = QuantityOneRate;	  // km

		this.QuantityTwoValue = QuantityTwoValue; // 5
		this.QuantityTwoRate = QuantityTwoRate;	  // hours
	}

	QuantityOneValue: number;
	QuantityOneRate: MetricUnits;
	// ^ per v
	QuantityTwoValue: number;
	QuantityTwoRate: TimeUnits;

	/** Returns a unit rate. x:1, "x per one" */
	static MakeUnit (R: Rate): Rate
	{
		return new Rate(
			R.QuantityOneValue / R.QuantityTwoValue,
			R.QuantityOneRate,

			1,
			R.QuantityTwoRate
		);
	}
}