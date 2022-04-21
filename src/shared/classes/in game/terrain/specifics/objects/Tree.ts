import { BiomeTypes, TreeTypes } from "../../../../../consts/Enums";
import { Strings } from "../../../../../consts/Strings";
import { TerrainResult } from "../regions/TerrainResult";
import { ITerrainObject } from "./ITerrainObject";

export class Tree implements ITerrainObject
{
	constructor (TreeModel: TreeTypes, YOffset: number)
	{
		if (TreeModel !== TreeTypes.SnowTree1)
		{
			let Children = Strings.StorageStrings.GetBiomeModelsFolder().WaitForChild("Trees", 5)?.GetChildren();
			if (Children !== undefined)
			{
				this.Model = (Children.size() > TreeModel ? Children[TreeModel].IsA("Model") ? Children[TreeModel] as Model : Children[0] as Model : Children[0] as Model);
			}
			else
			{
				error("", 1);
			}
		}
		else
		{
			let M = Strings.StorageStrings.GetBiomeModelsFolder().WaitForChild("SnowTrees", 5)?.WaitForChild("SnowTree", 5);
			this.Model = M === undefined ? error("Snow tree gone :(") : M.IsA("Model") ? M as Model : error("Not a model.");
		}
		this.TreeModel = TreeModel;
		this.YOffset = YOffset;
	}
	GeneratedByTerrain (TerrainCell: TerrainResult, Clone: Model)
	{
		if (this.TreeModel === TreeTypes.SnowTree1)
		{
			let Body = Clone.FindFirstChild("Body");
			if (Body !== undefined && Body.IsA("MeshPart"))
			{
				let RandomColorR = math.clamp(81 * (TerrainCell.Elevation + 2), 81, 255);
				let RandomColorG = math.clamp(91 * (TerrainCell.Elevation + 2), 91, 255);
				let RandomColorB = math.clamp(68 * (1 - TerrainCell.Temperature + 2), 68, 255);
				Body.Color = Color3.fromRGB(RandomColorR, RandomColorG, RandomColorB);
			}
		}
	}
	TreeModel: TreeTypes;
    MinimumTemperature: number = 0;
	MaximumTemperature: number = 1;
	MinimumMoisture: number = 0;
	MaximumMoisture: number = 1;
    MinimumElevation: number = 0;
	MaximumElevation: number = 1;
	BiomesAndRarity: Map<BiomeTypes, number> = new Map<BiomeTypes, number>([[BiomeTypes.Forest, 0.2], [BiomeTypes.SnowForest, 0.2]]);
	Model: Model;
	YOffset: number;
}