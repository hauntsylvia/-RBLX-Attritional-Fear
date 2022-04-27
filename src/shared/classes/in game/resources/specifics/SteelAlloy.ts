import { ResourceTypes } from "../../../../consts/Enums";
import { FactoryOrder } from "../FactoryOrder";
import { Resource } from "./Resource";

export class SteelAlloy extends Resource
{
	constructor (ParentOrder: FactoryOrder, WeightInKG: number)
	{
		super(ResourceTypes.SteelAlloy, ParentOrder, WeightInKG);
	}
}