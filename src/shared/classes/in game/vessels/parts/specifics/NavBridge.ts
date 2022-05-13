import { PartType } from "../../../../../consts/Enums";
import { Geometry } from "../../../../util/measurements/Geometry";
import { Rate } from "../../../../util/measurements/Rate";
import { EntityDamageEvent } from "../../../entities/EntityDamageEvent";
import { IEntityPart } from "../../../entities/IEntityPart";
import { Storable } from "../../../resources/specifics/Resource";
import { StorageContainer } from "../../../resources/StorageContainer";
import { VesselPart } from "../VesselPart";

export class NavBridge extends VesselPart
{
	constructor (Name: string, Description: string, EntityDamageEvents: EntityDamageEvent[], Geometry: Geometry, ModelToCloneName: string, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], SightRadiusMax: Rate)
	{
		super(Name, Description, EntityDamageEvents, Geometry, PartType.NavBridge, ModelToCloneName, StorageOfPart, ResourcesConsumedByPart, false);
		this.SightRadiusMax = SightRadiusMax;
	}

	SightRadiusMax: Rate;
}