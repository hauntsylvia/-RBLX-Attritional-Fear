import { MetricPrefixes } from "../../../consts/Enums";
import { Volume } from "./Volume";


export class Geometry
{
	constructor (PrefixOfValues: MetricPrefixes, Length: number, Width: number, Height: number)
	{
		this.Units = PrefixOfValues;
		this.Length = Length;
		this.Width = Width;
		this.Height = Height;
	}

	Units: MetricPrefixes;

	Length: number;

	Width: number;

	Height: number;

	static ConvertGeometryToOtherUnit (NewUnit: MetricPrefixes, A: Geometry)
	{
		let GAtBase = new Geometry(MetricPrefixes.Base, A.Length * A.Units, A.Width * A.Units, A.Height * A.Units);
		return new Geometry(NewUnit, GAtBase.Length * NewUnit, GAtBase.Width * NewUnit, GAtBase.Height * NewUnit);
	}

	static GetVolumeOfGeometry (UnitsToUse: MetricPrefixes, A: Geometry): Volume
	{
		let GTo = Geometry.ConvertGeometryToOtherUnit(UnitsToUse, A);
		return new Volume(UnitsToUse, GTo.Length * GTo.Width * GTo.Height);
	}
}