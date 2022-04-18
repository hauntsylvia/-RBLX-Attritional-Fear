import { Biomes } from "../../../../../consts/Enums";

export interface ITerrainObject
{
	BiomesAndRarity: Map<Biomes, number>;
	Model: Model;
	YOffset: number;
	MinimumElevation: number;
	MinimumMoisture: number;
	MinimumTemperature: number;
	MaximumElevation: number;
	MaximumMoisture: number;
	MaximumTemperature: number;
}