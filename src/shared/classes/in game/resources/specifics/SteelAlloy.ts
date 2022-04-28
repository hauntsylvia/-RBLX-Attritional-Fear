import { ResourceTypes } from "../../../../consts/Enums";
import { FactoryOrder } from "../FactoryOrder";
import { Storable } from "./Resource";

export class SteelAlloy extends Storable
{
	constructor (ParentOrder: FactoryOrder, WeightInKG: number, LengthInMM: number, WidthInMM: number, HeightInMM: number)
	{
		super(ResourceTypes.SteelAlloy, ParentOrder, WeightInKG, LengthInMM, WidthInMM, HeightInMM);
	}
}