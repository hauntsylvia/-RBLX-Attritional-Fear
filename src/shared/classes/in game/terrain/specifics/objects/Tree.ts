import { Biomes } from "../../../../../consts/Enums";
import { Strings } from "../../../../../consts/Strings";
import { ITerrainObject } from "./ITerrainObject";

export class Tree implements ITerrainObject
{
	constructor (TreeModel: number, YOffset: number)
	{
		let Children = Strings.StorageStrings.GetBiomeModelsFolder().FindFirstChild("Trees")?.GetChildren();
		if (Children !== undefined)
		{
			this.Model = (Children.size() > TreeModel ? Children[TreeModel].IsA("Model") ? Children[TreeModel] as Model : Children[0] as Model : Children[0] as Model);
		}
		else
		{
			error("", 1);
		}
		this.YOffset = YOffset;
	}
    MinimumTemperature: number = 0;
	MaximumTemperature: number = 1;
	MinimumMoisture: number = 0;
	MaximumMoisture: number = 1;
    MinimumElevation: number = 0.2;
    MaximumElevation: number = 1;
	BiomesAndRarity: Map<Biomes, number> = new Map<Biomes, number>([[Biomes.Forest, 0.1]]);
	Model: Model;
	YOffset: number;
}