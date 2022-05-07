import { PartType } from "../../../../consts/Enums";
import { Geometry } from "../../../util/measurements/Geometry";
import { Entity } from "../../entities/Entity";
import { IEntityPart } from "../../entities/IEntityPart";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart extends Entity
{
	constructor (EntityParts: IEntityPart[], Name: string, Type: PartType, ModelOfPart: Model, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[])
	{
		super(EntityParts, Name, PartType[Type]);
		this.Type = Type;
		this.ModelOfPart = ModelOfPart;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	Type: PartType;

	ModelOfPart: Model;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];
}