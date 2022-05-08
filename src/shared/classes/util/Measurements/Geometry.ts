import { MetricUnits } from "../../../consts/Enums";
import { Mass } from "./Mass";
import { Volume } from "./Volume";


export class Geometry
{
	constructor (PrefixOfValues: MetricUnits, Length: number, Width: number, Height: number, Density: number)
	{
		this.Units = PrefixOfValues;
		this.Length = Length;
		this.Width = Width;
		this.Height = Height;
		this.Density = Density;
	}

	Units: MetricUnits;

	Length: number;

	Width: number;

	Height: number;

	/** If the units used are base, then this is equivalent to grams per cubic meter. */
	Density: number;

	static ConvertGeometryToOtherUnit (NewUnits: MetricUnits, A: Geometry): Geometry
	{
		let GAtBase = new Geometry(MetricUnits.Base, A.Length * A.Units, A.Width * A.Units, A.Height * A.Units, A.Density * A.Units);
		return new Geometry(NewUnits,
			GAtBase.Length !== 0 ? GAtBase.Length / NewUnits : 0,
			GAtBase.Width !== 0 ? GAtBase.Width / NewUnits : 0,
			GAtBase.Height !== 0 ? GAtBase.Height / NewUnits : 0,
			GAtBase.Density !== 0 ? GAtBase.Density / NewUnits : 0);
	}

	static GetVolumeOfGeometry (UnitsToUse: MetricUnits, A: Geometry): Volume
	{
		let GTo = Geometry.ConvertGeometryToOtherUnit(UnitsToUse, A);
		return new Volume(UnitsToUse, GTo.Length * GTo.Width * GTo.Height);
	}

	static GetMass (UnitsToUse: MetricUnits, A: Geometry): Mass
	{
		let GAtBase = new Geometry(MetricUnits.Base, A.Length * A.Units, A.Width * A.Units, A.Height * A.Units, A.Density * A.Units);
		let Volume = Geometry.GetVolumeOfGeometry(UnitsToUse, A);
		return new Mass(UnitsToUse, Volume.CubicVolume * GAtBase.Density);
	}
}