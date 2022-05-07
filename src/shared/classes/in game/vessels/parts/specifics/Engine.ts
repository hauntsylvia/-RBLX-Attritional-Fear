import { PartType } from "../../../../../consts/Enums";
import { Geometry } from "../../../../util/Measurements/Geometry";
import { Speed } from "../../../../util/Measurements/Speed";
import { IEntityPart } from "../../../entities/IEntityPart";
import { Storable } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class Engine extends VesselPart
{
	constructor (EntityParts: IEntityPart[], Name: string, Type: PartType, ModelOfPart: Model, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], SpeedAtBase: Speed)
	{
		super(EntityParts, Name, Type, ModelOfPart, StorageOfPart, ResourcesConsumedByPart);
		this.SpeedAtBase = SpeedAtBase;
	}

	SpeedAtBase: Speed;
}