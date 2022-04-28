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
		this.LengthInMM = LengthInMM;
		this.WidthInMM = WidthInMM;
		this.HeightInMM = HeightInMM;
	}

	TypeOfStorable: StorableType;

	ParentOrder: FactoryOrder;

	WeightInKG: number;

	LengthInMM: number;

	WidthInMM: number;

	HeightInMM: number;
}