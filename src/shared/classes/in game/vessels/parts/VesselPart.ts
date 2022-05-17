import { PartType } from "../../../../consts/Enums";
import { Strings } from "../../../../consts/Strings";
import { Geometry } from "../../../util/measurements/Geometry";
import { EntityDamageEvent } from "../../entities/implementations/EntityDamageEvent";
import { IEntityPart } from "../../entities/interfaces/IEntityPart";
import { Storable } from "../../resources/specifics/Resource";
import { StorageContainer } from "../../resources/StorageContainer";

export class VesselPart implements IEntityPart
{
	constructor (Name: string, Description: string, EntityDamageEvents: EntityDamageEvent[], Geometry: Geometry, Type: PartType, ModelToCloneName: string, StorageOfPart: StorageContainer, ResourcesConsumedByPart: Storable[], FullEntityDeathWhenDisabled: boolean)
	{
		this.Name = Name;
		this.Description = Description;
		this.ModelName = ModelToCloneName;
		this.EntityDamageEvents = EntityDamageEvents;
		this.Geometry = Geometry;
		this.Type = Type;
		this.StorageOfPart = StorageOfPart;
		this.ResourcesConsumedByPart = ResourcesConsumedByPart;
		this.ModelCenter = VesselPart.GetModelCenter(this);
		this.FullEntityDeathWhenDisabled = FullEntityDeathWhenDisabled;
	}

	Name: string;

	Description: string;

	ModelName: string;

	EntityDamageEvents: EntityDamageEvent[];

    Geometry: Geometry;

	Type: PartType;

	StorageOfPart: StorageContainer;

	ResourcesConsumedByPart: Storable[];

	ModelCenter: Vector3;

	FullEntityDeathWhenDisabled: boolean;

	static GetModel (VP: VesselPart): Model | undefined
	{
		let F = Strings.StorageStrings.GetVesselPartsFolder(VP.Type);
		let M = F.FindFirstChild(VP.ModelName);
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