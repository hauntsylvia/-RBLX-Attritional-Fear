import { PartTypes } from "../../../../../consts/Enums";
import { Resource } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class VesselFrame extends VesselPart
{
	constructor (Type: PartTypes, ModelOfPart: Model, WeightInKG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Resource[], TimeToMove1000KGOfMass1DegreeInSeconds: number)
	{
		super(Type, ModelOfPart, WeightInKG, StorageOfPart, ResourcesConsumedByPart);
		this.TimeToMove1000KGOfMass1DegreeInSeconds = TimeToMove1000KGOfMass1DegreeInSeconds;
	}

	TimeToMove1000KGOfMass1DegreeInSeconds: number = 5;
}