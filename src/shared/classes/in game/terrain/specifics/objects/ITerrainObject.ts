import { BiomeType } from "../../../../../consts/Enums";
import { TerrainResult } from "../regions/TerrainResult";

export abstract class TerrainObject
{
	constructor ()
	{
	}
	abstract BiomesAndRarity: Map<BiomeType, number>;
	public SpawnAt: CFrame | undefined;
	abstract Model: Model;
	abstract YOffset: number;
	abstract MinimumElevation: number;
	abstract MinimumMoisture: number;
	abstract MinimumTemperature: number;
	abstract MaximumElevation: number;
	abstract MaximumMoisture: number;
	abstract MaximumTemperature: number;
	abstract GeneratedByTerrain (TerrainCell: TerrainResult, Clone: Model): any;
	/** The minimum number of real-world cells this object can be placed between.
	 * If the map cell size is 5, the painter will treat each cell divided by 5 as
	 * its own cell, because otherwise the cells will be stretched out, causing a
	 * per-cell generation to be not-dense.*/
	abstract Density: number;

	public SetPos (SpawnAt: CFrame)
	{
		this.SpawnAt = SpawnAt;
	}

	public GetPos (): CFrame | undefined
	{
		return this.SpawnAt;
	}
}