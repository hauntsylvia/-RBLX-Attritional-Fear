import { BuildingTypes, BuildingVisuals } from "../../../../../consts/Enums";

export class BuildingVisualsSettings
{
	constructor (V: Map<BuildingTypes, BuildingVisuals>)
	{
		this.V = V;
	}

	V: Map<BuildingTypes, BuildingVisuals>;
}