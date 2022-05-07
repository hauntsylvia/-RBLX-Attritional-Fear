import { ResourceType } from "../../../../consts/Enums";
import { Geometry } from "../../../util/Measurements/Geometry";
import { Mass } from "../../../util/Measurements/Mass";
import { CrewMember } from "../../vessels/CrewMember";
import { FactoryOrder } from "../FactoryOrder";

export class Storable
{
	constructor (TypeOfStorable: ResourceType, ParentOrder: FactoryOrder, Geometry: Geometry)
	{
		this.TypeOfStorable = TypeOfStorable;
		this.ParentOrder = ParentOrder;
		this.Geometry = Geometry;
	}

	TypeOfStorable: ResourceType;

	ParentOrder: FactoryOrder;

	Geometry: Geometry;
}