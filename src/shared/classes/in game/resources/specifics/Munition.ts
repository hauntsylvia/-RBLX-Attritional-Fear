import { ResourceTypes } from "../../../../consts/Enums";
import { IFactory } from "../../buildings/interfaces/IFactory";
import { FactoryOrder } from "../FactoryOrder";
import { Resource } from "./Resource";

export class Munition extends Resource
{
	constructor (ParentOrder: FactoryOrder, WeightInKG: number, MMCaliber: number)
	{
		super(ResourceTypes.Munition, ParentOrder, WeightInKG);
		this.MMCaliber = MMCaliber;
	}

	MMCaliber: number;
}