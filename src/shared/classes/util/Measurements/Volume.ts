import { MetricPrefixes } from "../../../consts/Enums";

export class Volume
{
	constructor (PrefixOfValues: MetricPrefixes, CubicVolume: number)
	{
		this.PrefixOfValues = PrefixOfValues;
		this.CubicVolume = CubicVolume;
	}

	PrefixOfValues: MetricPrefixes;

	CubicVolume: number;
}