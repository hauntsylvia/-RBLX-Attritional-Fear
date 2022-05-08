import { PartType } from "../../../../consts/Enums";
import { Geometry } from "../../../util/measurements/Geometry";
import { Entity } from "../../entities/Entity";
import { EntityDamageEvent } from "../../entities/EntityDamageEvent";
import { IEntityPart } from "../../entities/IEntityPart";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart implements IEntityPart
{
	constructor (Name: string, Description: string, EntityDamageEvents: EntityDamageEvent[], Geometry: Geometry, Type: PartType, ModelOfPart: Model, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[])
	{
		this.Name = Name;
		this.Description = Description;
		this.EntityDamageEvents = EntityDamageEvents;
		this.Geometry = Geometry;
		this.Type = Type;
		this.ModelOfPart = ModelOfPart;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	Name: string;

	Description: string;

	EntityDamageEvents: EntityDamageEvent[];

    Geometry: Geometry;

	Type: PartType;

	ModelOfPart: Model;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];

	static GetModelCenter (VP: VesselPart): Vector3
	{
		let Sum = Vector3.zero;
		let Iterations = 0;
		VP.ModelOfPart.GetDescendants().forEach(D =>
		{
			if (D.IsA("Part") || D.IsA("BasePart") || D.IsA("MeshPart"))
			{
				Sum = Sum.add(D.Position);
				Iterations++;
			}
		});
		return Sum.div(Iterations);
	}
}