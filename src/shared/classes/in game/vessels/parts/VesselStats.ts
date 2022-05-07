import { Geometry } from "../../../util/Measurements/Geometry";
import { Mass } from "../../../util/Measurements/Mass";
import { Speed } from "../../../util/Measurements/Speed";

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