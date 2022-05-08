import { PartType } from "../../../../consts/Enums";
import { Strings } from "../../../../consts/Strings";
import { Geometry } from "../../../util/measurements/Geometry";
import { Entity } from "../../entities/Entity";
import { EntityDamageEvent } from "../../entities/EntityDamageEvent";
import { IEntityPart } from "../../entities/IEntityPart";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart implements IEntityPart
{
	constructor (Name: string, Description: string, EntityDamageEvents: EntityDamageEvent[], Geometry: Geometry, Type: PartType, ModelToCloneName: string, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[])
	{
		this.Name = Name;
		this.Description = Description;
		this.ModelToCloneName = ModelToCloneName;
		this.EntityDamageEvents = EntityDamageEvents;
		this.Geometry = Geometry;
		this.Type = Type;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
	}

	Name: string;

	Description: string;

	ModelToCloneName: string;

	EntityDamageEvents: EntityDamageEvent[];

    Geometry: Geometry;

	Type: PartType;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];

	static GetModel (VP: VesselPart): Model | undefined
	{
		let F = Strings.StorageStrings.GetVesselPartsFolder(VP.Type);
		let M = F.FindFirstChild(VP.ModelToCloneName);
		return M !== undefined && M.IsA("Model") ? M : undefined;
	}

	static GetModelCenter (VP: VesselPart): Vector3
	{
		let Sum = Vector3.zero;
		let Iterations = 0;
		let Model = VesselPart.GetModel(VP);
		if (Model !== undefined)
		{
			Model.GetDescendants().forEach(D =>
			{
				if (D.IsA("Part") || D.IsA("BasePart") || D.IsA("MeshPart"))
				{
					Sum = Sum.add(D.Position);
					Iterations++;
				}
			});
			Iterations = Iterations !== 0 ? Iterations : 1;
			Sum = Sum !== Vector3.zero ? Sum.div(Iterations) : Vector3.zero;
			return Sum.div(Iterations);
		}
		else
		{
			return Vector3.zero;
		}
	}
}