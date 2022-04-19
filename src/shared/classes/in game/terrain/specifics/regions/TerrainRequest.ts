import { NoiseHelper } from "../../NoiseHelper";
import { Biome } from "../biomes/Biome";

export class TerrainRequest
{
	constructor (ElevationMap: NoiseHelper, MoistureMap: NoiseHelper, SizePerCell: number, WaterHeight: number)
	{
		this.ElevationMap = ElevationMap;
		this.MoistureMap = MoistureMap;

		this.SizePerCell = SizePerCell;
		this.WaterHeightOffset = WaterHeight;
	}

	ElevationMap: NoiseHelper;
	MoistureMap: NoiseHelper;

	SizePerCell: number;
	WaterHeightOffset: number;
}