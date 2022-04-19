import { Biome } from "../biomes/Biome";

export class TerrainRequest
{
	constructor (ElevationMap: number[][], MoistureMap: number[][], TempMap: number[][], SizePerCell: number, WaterHeight: number)
	{
		this.ElevationMap = ElevationMap;
		this.MoistureMap = MoistureMap;
		this.TempMap = TempMap;

		this.SizePerCell = SizePerCell;
		this.WaterHeight = WaterHeight;
	}

	ElevationMap: number[][];
	MoistureMap: number[][];
	TempMap: number[][];

	SizePerCell: number;
	WaterHeight: number;
}