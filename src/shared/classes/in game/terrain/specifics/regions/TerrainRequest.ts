import { NoiseHelper } from "../../NoiseHelper";
import { Biome } from "../biomes/Biome";

export class TerrainRequest
{
	constructor (ElevationMap: NoiseHelper, MoistureMap: NoiseHelper, SizePerCell: number, WaterHeight: number)
	{
		//this.ElevationMap = new NoiseHelper(ElevationMap.Z, ElevationMap.Height, ElevationMap.Width, ElevationMap.Exponent);
		//this.MoistureMap = new NoiseHelper(MoistureMap.Z, MoistureMap.Height, MoistureMap.Width, MoistureMap.Exponent);
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