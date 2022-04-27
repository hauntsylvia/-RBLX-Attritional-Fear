import { Resource } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart
{
	constructor (StorageOfPart: StorageContainer, ResourcesConsumedByPart: Resource[])
	{
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Resource[];
}