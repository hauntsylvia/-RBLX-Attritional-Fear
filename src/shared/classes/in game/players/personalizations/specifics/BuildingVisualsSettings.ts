import { BuildingTypes, BuildingVisuals } from "../../../../../consts/Enums";

export class BuildingVisualsSettings
{
	constructor (V: Map<BuildingTypes, BuildingVisuals>)
	{
		this.V = V;
	}

	private V: Map<BuildingTypes, BuildingVisuals>;

	GetVisualsForBuilding (Building: BuildingTypes): BuildingVisuals
	{
		return this.V.get(Building) ?? BuildingVisuals.Default;
	}
}