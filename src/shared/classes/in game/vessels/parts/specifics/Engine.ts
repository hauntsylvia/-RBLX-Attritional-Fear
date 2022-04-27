import { PartTypes } from "../../../../../consts/Enums";
import { Resource } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class Engine extends VesselPart
{
	constructor (Type: PartTypes, ModelOfPart: Model, WeightInKG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Resource[], TimeToMove1000KGOfMass1StudInSeconds: number)
	{
		super(Type, ModelOfPart, WeightInKG, StorageOfPart, ResourcesConsumedByPart);
		this.TimeToMove1000KGOfMass1StudInSeconds = TimeToMove1000KGOfMass1StudInSeconds;
	}

	TimeToMove1000KGOfMass1StudInSeconds: number = 10;
}