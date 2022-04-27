import { ResourceTypes } from "../../../../consts/Enums";
import { CrewMember } from "../../vessels/CrewMember";
import { FactoryOrder } from "../FactoryOrder";

export class Resource
{
	constructor (TypeOfResource: ResourceTypes, ParentOrder: FactoryOrder, WeightInKG: number)
	{
		this.TypeOfResource = TypeOfResource;
		this.ParentOrder = ParentOrder;
		this.WeightInKG = WeightInKG;
	}

	TypeOfResource: ResourceTypes;

	ParentOrder: FactoryOrder;

	WeightInKG: number;
}