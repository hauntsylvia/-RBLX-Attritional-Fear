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
    MinimumTemperature: number = 0.3;
    MaximumTemperature: number = 0.7;
    MinimumElevation: number = 0.2;
    MinimumMoisture: number = 0.4;
    MaximumElevation: number = 1;
    MaximumMoisture: number = 1;
	BiomesAndRarity: Map<Biomes, number> = new Map<Biomes, number>([[Biomes.Forest, 0.001]]);
	Model: Model;
	YOffset: number;
}