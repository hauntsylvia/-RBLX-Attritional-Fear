import { PartTypes } from "../../../../consts/Enums";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart
{
	constructor (Type: PartTypes, ModelOfPart: Model, WeightInKG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[])
	{
		this.Type = Type;
		this.ModelOfPart = ModelOfPart;
		this.WeightInKG = WeightInKG;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	Type: PartTypes;

	ModelOfPart: Model;

	WeightInKG: number;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];
}