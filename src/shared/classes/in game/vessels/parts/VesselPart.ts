import { Resource } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart
{
	constructor (ModelOfPart: Model, WeightInKG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Resource[])
	{
		this.ModelOfPart = ModelOfPart;
		this.WeightInKG = WeightInKG;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	ModelOfPart: Model;

	WeightInKG: number;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Resource[];
}