import { MetricUnits } from "../../../consts/Enums";

export class Volume
{
	constructor (PrefixOfValues: MetricUnits, CubicVolume: number)
	{
		this.PrefixOfValues = PrefixOfValues;
		this.CubicVolume = CubicVolume;
	}

	PrefixOfValues: MetricUnits;

	CubicVolume: number;
}