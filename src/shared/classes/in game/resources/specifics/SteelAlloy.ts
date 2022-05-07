import { ResourceType } from "../../../../consts/Enums";
import { Geometry } from "../../../util/Measurements/Geometry";
import { FactoryOrder } from "../FactoryOrder";
import { Storable } from "./Resource";

export class SteelAlloy extends Storable
{
	constructor (ParentOrder: FactoryOrder, Geometry: Geometry)
	{
		super(ResourceType.SteelAlloy, ParentOrder, Geometry);
	}
}