import { NoiseHelper } from "../../NoiseHelper";
import { Biome } from "../biomes/Biome";

export class TerrainRequest
{
	constructor (MapBoundaryMax: number, ElevationMapZ: number, MoistureMapZ: number, SizePerCell: number, WaterHeight: number)
	{
		//this.ElevationMap = new NoiseHelper(ElevationMap.Z, ElevationMap.Height, ElevationMap.Width, ElevationMap.Exponent);
		//this.MoistureMap = new NoiseHelper(MoistureMap.Z, MoistureMap.Height, MoistureMap.Width, MoistureMap.Exponent);
		this.MapBoundaryMax = MapBoundaryMax;

		this.ElevationMapZ = ElevationMapZ;
		this.MoistureMapZ = MoistureMapZ;

		this.SizePerCell = SizePerCell;
		this.WaterHeightOffset = WaterHeight;
	}

	MapBoundaryMax: number;

	ElevationMapZ: number;
	MoistureMapZ: number;

	SizePerCell: number;
	WaterHeightOffset: number;
}