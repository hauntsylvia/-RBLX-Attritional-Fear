import { Biome } from "../biomes/Biome";

export class TerrainResult
{
	constructor (Elevation: number, Moisture: number, Temperature: number, Biome: Biome)
	{
		this.Elevation = Elevation;
		this.Moisture = Moisture;
		this.Temperature = Temperature;
		this.Biome = Biome;
	}

	Elevation: number;
	Moisture: number;
	Temperature: number;
	Biome: Biome;
}