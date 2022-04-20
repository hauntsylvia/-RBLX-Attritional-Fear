import { Biome } from "../biomes/Biome";

export class TerrainResult
{
	constructor (Elevation: number, Moisture: number, Temperature: number, X: number, Z: number, Biome: Biome, RandomCellAngle: CFrame, WaterHeight: number)
	{
		this.Elevation = Elevation;
		this.Moisture = Moisture;
		this.Temperature = Temperature;
		this.X = X;
		this.Z = Z;
		this.Biome = Biome;
		this.RandomCellAngle = RandomCellAngle;
		this.WaterHeight = WaterHeight;
	}

	Elevation: number;
	Moisture: number;
	Temperature: number;
	X: number;
	Z: number;
	Biome: Biome;
	RandomCellAngle: CFrame;
	WaterHeight: number;
}