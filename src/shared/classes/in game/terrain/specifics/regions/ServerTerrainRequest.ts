import { NoiseHelper } from "../../NoiseHelper";
import { Biome } from "../biomes/Biome";

export class ServerTerrainRequest
{
	constructor (XPoint: number, ZPoint: number, XToPoint: number, ZToPoint: number)
	{
		this.XPoint = XPoint;
		this.ZPoint = ZPoint;
		this.XToPoint = XToPoint;
		this.ZToPoint = ZToPoint;
	}

	XPoint: number;
	ZPoint: number;
	XToPoint: number;
	ZToPoint: number;
}