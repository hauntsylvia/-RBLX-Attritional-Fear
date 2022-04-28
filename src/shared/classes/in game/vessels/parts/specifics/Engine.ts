import { PartType } from "../../../../../consts/Enums";
import { Storable } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class Engine extends VesselPart
{
	constructor (Type: PartType, ModelOfPart: Model, WeightInKG: number, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], TimeToMove1000KGOfMass1StudInSeconds: number)
	{
		super(Type, ModelOfPart, WeightInKG, StorageOfPart, ResourcesConsumedByPart);
		this.TimeToMove1000KGOfMass1StudInSeconds = TimeToMove1000KGOfMass1StudInSeconds;
	}

	TimeToMove1000KGOfMass1StudInSeconds: number = 10;
}