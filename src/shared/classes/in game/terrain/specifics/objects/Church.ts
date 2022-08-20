import { BiomeType } from "../../../../../consts/Enums";
import { Strings } from "../../../../../consts/Strings";
import { TerrainResult } from "../regions/TerrainResult";
import { TerrainObject } from "./ITerrainObject";

export class Church extends TerrainObject
{
	constructor (YOffset: number)
	{
		super();
		this.Model = Strings.StorageStrings.GetBiomeModelsFolder().WaitForChild("Abandoned")?.WaitForChild("Church") as Model ?? error("No church model.");
		this.YOffset = YOffset;
		this.Density = 20;
	}

	GeneratedByTerrain (TerrainCell: TerrainResult, Clone: Model)
	{

	}

    MinimumTemperature: number = 0;
	MaximumTemperature: number = 1;

	MinimumElevation: number = 0.2;
	MaximumElevation: number = 1;

	MinimumMoisture: number = 0;
	MaximumMoisture: number = 1;

	BiomesAndRarity: Map<BiomeType, number> = new Map<BiomeType, number>([[BiomeType.Forest, 0.00001]]);
	Model: Model;
	YOffset: number;

	Density: number;
}