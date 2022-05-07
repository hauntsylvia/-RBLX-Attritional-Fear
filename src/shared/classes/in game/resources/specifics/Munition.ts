import { ResourceType } from "../../../../consts/Enums";
import { Geometry } from "../../../util/measurements/Geometry";
import { IFactory } from "../../buildings/interfaces/IFactory";
import { FactoryOrder } from "../FactoryOrder";
import { Storable } from "./Resource";

export class Munition extends Storable
{
	constructor (ParentOrder: FactoryOrder, Geometry: Geometry, )
	{
		super(ResourceType.Munition, ParentOrder, Geometry);
	}
}