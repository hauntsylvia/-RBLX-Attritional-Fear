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

	/** The number to begin at, X. */
	XPoint: number;
	/** The number to begin at, Z. */
	ZPoint: number;
	/** The number to end up at, X. */
	XToPoint: number;
	/** The number to end up at, Z. */
	ZToPoint: number;

	/**
	 * Adds Distance to XPoint and ZPoint.
	 * @param XPoint
	 * @param ZPoint
	 * @param Distance
	 */
	public static FromDistance (XPoint: number, ZPoint: number, Distance: number): ServerTerrainRequest
	{
		return new ServerTerrainRequest(XPoint, ZPoint, XPoint + Distance, ZPoint + Distance);
	}
}