import { MetricPrefixes } from "../../../consts/Enums";

export class Speed
{
	constructor (Units: MetricPrefixes, MaxAccelerationPerSecond: number)
	{
		this.Units = Units;
		this.MaxVelocityInOneSecond = MaxAccelerationPerSecond;
	}

	Units: MetricPrefixes;

	MaxVelocityInOneSecond: number;

	static ConvertToUnits (NewUnits: MetricPrefixes, A: Speed): Speed
	{
		let SAtBase = new Speed(MetricPrefixes.Base, A.MaxVelocityInOneSecond * A.Units);
		return new Speed(NewUnits, SAtBase.MaxVelocityInOneSecond / NewUnits);
	}
}