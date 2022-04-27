export class VesselStats
{
	constructor (MaxForwardSpeed: number, MaxRotationSpeed: number, WeightInKG: number)
	{
		this.MaxForwardSpeed = MaxForwardSpeed;
		this.MaxRotationSpeed = MaxRotationSpeed;
		this.WeightInKG = WeightInKG;
	}
	MaxForwardSpeed: number;
	MaxRotationSpeed: number;
	WeightInKG: number;
}