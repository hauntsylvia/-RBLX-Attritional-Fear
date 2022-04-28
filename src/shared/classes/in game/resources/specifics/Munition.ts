import { StorableType } from "../../../../consts/Enums";
import { IFactory } from "../../buildings/interfaces/IFactory";
import { FactoryOrder } from "../FactoryOrder";
import { Storable } from "./Resource";

export class Munition extends Storable
{
	constructor (ParentOrder: FactoryOrder, WeightInKG: number, LengthInMM: number, WidthInMM: number, HeightInMM: number, MMCaliber: number)
	{
		super(StorableType.Munition, ParentOrder, WeightInKG, LengthInMM, WidthInMM, HeightInMM);
		this.MMCaliber = MMCaliber;
	}

	MMCaliber: number;
}