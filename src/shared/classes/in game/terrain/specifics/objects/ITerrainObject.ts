import { BiomeTypes } from "../../../../../consts/Enums";
import { TerrainResult } from "../regions/TerrainResult";

export interface ITerrainObject
{
	BiomesAndRarity: Map<BiomeTypes, number>;
	Model: Model;
	YOffset: number;
	MinimumElevation: number;
	MinimumMoisture: number;
	MinimumTemperature: number;
	MaximumElevation: number;
	MaximumMoisture: number;
	MaximumTemperature: number;
	GeneratedByTerrain (TerrainCell: TerrainResult, Clone: Model): any;
}