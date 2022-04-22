import { Biome } from "../biomes/Biome";
import { ITerrainObject } from "../objects/ITerrainObject";

export class TerrainResult
{
	constructor (RealPosition: CFrame, Elevation: number, Moisture: number, Temperature: number, X: number, Z: number, Biome: Biome, RandomCellAngle: CFrame, WaterHeight: number)
	{
		this.RealPosition = RealPosition;
		this.Elevation = Elevation;
		this.Moisture = Moisture;
		this.Temperature = Temperature;
		this.X = X;
		this.Z = Z;
		this.Biome = Biome;
		this.WaterHeight = WaterHeight;
	}

	RealPosition: CFrame;
	Elevation: number;
	Moisture: number;
	Temperature: number;
	X: number;
	Z: number;
	Biome: Biome;
	ModelToSpawnHere: ITerrainObject | undefined;
	SpawnModelAt: CFrame | undefined;
	WaterHeight: number;
}