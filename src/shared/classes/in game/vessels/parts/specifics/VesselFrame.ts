import { PartType } from "../../../../../consts/Enums";
import { Geometry } from "../../../../util/measurements/Geometry";
import { Rate } from "../../../../util/measurements/Rate";
import { IEntityPart } from "../../../entities/IEntityPart";
import { Storable } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class VesselFrame extends VesselPart
{
	constructor (EntityParts: IEntityPart[], Name: string, Type: PartType, ModelOfPart: Model, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], Speed: Rate)
	{
		super(EntityParts, Name, Type, ModelOfPart, StorageOfPart, ResourcesConsumedByPart);
		this.Speed = Speed;
	}

	Speed: Rate;
}