import { MetricUnits } from "../../../consts/Enums";

export class Speed
{
	constructor (Units: MetricUnits, MaxAccelerationPerSecond: number)
	{
		this.Units = Units;
		this.MaxVelocityInOneSecond = MaxAccelerationPerSecond;
	}

	Units: MetricUnits;

	MaxVelocityInOneSecond: number;

	static ConvertToUnits (NewUnits: MetricUnits, A: Speed): Speed
	{
		let SAtBase = new Speed(MetricUnits.Base, A.MaxVelocityInOneSecond * A.Units);
		return new Speed(NewUnits, SAtBase.MaxVelocityInOneSecond / NewUnits);
	}
}