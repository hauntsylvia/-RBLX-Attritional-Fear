import { Biomes } from "../../../../../consts/Enums";
import { Strings } from "../../../../../consts/Strings";
import { ITerrainObject } from "./ITerrainObject";

export class Church implements ITerrainObject
{
	constructor (YOffset: number)
	{
		this.Model = Strings.StorageStrings.GetBiomeModelsFolder().FindFirstChild("Abandoned")?.FindFirstChild("Church") as Model ?? error("No church model.");
		this.YOffset = YOffset;
	}
    MinimumTemperature: number = 0;
	MaximumTemperature: number = 1;

	MinimumElevation: number = 0.2;
	MaximumElevation: number = 1;

	MinimumMoisture: number = 0;
	MaximumMoisture: number = 1;

	BiomesAndRarity: Map<Biomes, number> = new Map<Biomes, number>([[Biomes.Forest, 0.001]]);
	Model: Model;
	YOffset: number;
}