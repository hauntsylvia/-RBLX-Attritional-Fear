import { ResourceTypes, StorableTypes } from "../../../../consts/Enums";
import { CrewMember } from "../../vessels/CrewMember";
import { FactoryOrder } from "../FactoryOrder";

export class Storable
{
	constructor (TypeOfResource: ResourceTypes, ParentOrder: FactoryOrder, WeightInKG: number, LengthInMM: number, WidthInMM: number, HeightInMM: number)
	{
		this.StorableType = StorableTypes.Resource;
		this.TypeOfResource = TypeOfResource;
		this.ParentOrder = ParentOrder;
		this.WeightInKG = WeightInKG;
		this.LengthInMM = LengthInMM;
		this.WidthInMM = WidthInMM;
		this.HeightInMM = HeightInMM;
	}

    StorableType: StorableTypes;

	TypeOfResource: ResourceTypes;

	ParentOrder: FactoryOrder;

	WeightInKG: number;

	LengthInMM: number;

	WidthInMM: number;

	HeightInMM: number;
}