import { StorableType } from "../../../../consts/Enums";
import { CrewMember } from "../../vessels/CrewMember";
import { FactoryOrder } from "../FactoryOrder";

export class Storable
{
	constructor (TypeOfStorable: StorableType, ParentOrder: FactoryOrder, WeightInKG: number, LengthInMM: number, WidthInMM: number, HeightInMM: number)
	{
		this.TypeOfStorable = TypeOfStorable;
		this.ParentOrder = ParentOrder;
		this.WeightInKG = WeightInKG;
		this.LengthInMeters = LengthInMM;
		this.WidthInMeters = WidthInMM;
		this.HeightInMeters = HeightInMM;
	}

	TypeOfStorable: StorableType;

	ParentOrder: FactoryOrder;

	WeightInKG: number;

	LengthInMeters: number;

	WidthInMeters: number;

	HeightInMeters: number;

	static GetVolumeInCubicMeters (Self: Storable): number
	{
		return Self.HeightInMeters * Self.LengthInMeters * Self.WidthInMeters;
	}
}