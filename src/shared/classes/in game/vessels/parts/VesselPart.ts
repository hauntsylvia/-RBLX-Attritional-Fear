import { PartType } from "../../../../consts/Enums";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart
{
	constructor (Type: PartType, ModelOfPart: Model, WeightInG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[])
	{
		this.Type = Type;
		this.ModelOfPart = ModelOfPart;
		this.WeightInG = WeightInG;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	Type: PartType;

	ModelOfPart: Model;

	WeightInG: number;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];
}