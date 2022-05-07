import { ResourceType } from "../../../../consts/Enums";
import { CrewMember } from "../../vessels/CrewMember";
import { FactoryOrder } from "../FactoryOrder";

export class Storable
{
	constructor (TypeOfStorable: ResourceType, ParentOrder: FactoryOrder, Density: number, LengthInMeters: number, WidthInMeters: number, HeightInMeters: number)
	{
		this.TypeOfStorable = TypeOfStorable;
		this.ParentOrder = ParentOrder;
		this.DensityCubicMeters = Density;
		this.LengthInMeters = LengthInMeters;
		this.WidthInMeters = WidthInMeters;
		this.HeightInMeters = HeightInMeters;
	}

	TypeOfStorable: ResourceType;

	ParentOrder: FactoryOrder;

	/** Grams/M^3 - For mass, use the static method for getting weight. */
	DensityCubicMeters: number;

	LengthInMeters: number;

	WidthInMeters: number;

	HeightInMeters: number;

	static GetWeightInG (Self: Storable): number
	{
		return (Self.DensityCubicMeters) * this.GetVolumeInCubicMeters(Self);
	}

	static GetVolumeInCubicMeters (Self: Storable): number
	{
		return Self.HeightInMeters * Self.LengthInMeters * Self.WidthInMeters;
	}
}