import { Geometry } from "../../../util/measurements/Geometry";
import { Mass } from "../../../util/measurements/Mass";
import { Speed } from "../../../util/measurements/Speed";

export class VesselStats
{
	constructor (MaxSpeedPotential: Speed, MaxRotationPotential: Speed)
	{
		this.MaxSpeedPotential = MaxSpeedPotential;
		this.MaxRotationPotential = MaxRotationPotential;
	}

	MaxSpeedPotential: Speed;

	MaxRotationPotential: Speed;
}