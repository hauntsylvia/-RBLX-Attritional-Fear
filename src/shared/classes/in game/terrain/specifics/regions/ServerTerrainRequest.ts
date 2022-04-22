import { NoiseHelper } from "../../NoiseHelper";
import { Biome } from "../biomes/Biome";

export class ServerTerrainRequest
{
	constructor (XPoint: number, ZPoint: number, XToPoint: number, ZToPoint: number, MapSizePerCell?: number)
	{
		this.XPoint = math.round(XPoint / (MapSizePerCell ?? 1));
		this.ZPoint = math.round(ZPoint / (MapSizePerCell ?? 1));
		this.XToPoint = math.round(XToPoint / (MapSizePerCell ?? 1));
		this.ZToPoint = math.round(ZToPoint / (MapSizePerCell ?? 1));
	}

	XPoint: number;
	ZPoint: number;
	XToPoint: number;
	ZToPoint: number;
}