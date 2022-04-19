import { BiomeTypes } from "../../../../../consts/Enums";
import { Strings } from "../../../../../consts/Strings";
import { TerrainResult } from "../regions/TerrainResult";
import { ITerrainObject } from "./ITerrainObject";

export class Church implements ITerrainObject
{
	constructor (YOffset: number)
	{
		this.Model = Strings.StorageStrings.GetBiomeModelsFolder().WaitForChild("Abandoned", 5)?.WaitForChild("Church", 5) as Model ?? error("No church model.");
		this.YOffset = YOffset;
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

	BiomesAndRarity: Map<BiomeTypes, number> = new Map<BiomeTypes, number>([[BiomeTypes.Forest, 0.00001]]);
	Model: Model;
	YOffset: number;
}