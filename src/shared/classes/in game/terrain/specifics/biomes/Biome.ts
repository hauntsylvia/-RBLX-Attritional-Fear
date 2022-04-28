import { BiomeType } from "../../../../../consts/Enums";
import { ITerrainObject } from "../objects/ITerrainObject";

export class Biome
{
	constructor (
		MaximumElevation: number,
		MinimumElevation: number,

		MaximumMoisture: number,
		MinimumMoisture: number,

		MaximumTemp: number,
		MinimumTemp: number,

		RandomObjects: ITerrainObject[],
		GroundMaterialDefault: Enum.Material, BiomeEnum: BiomeType)
	{
		this.MaximumElevation = MaximumElevation;
		this.MinimumElevation = MinimumElevation;

		this.MaximumMoisture = MaximumMoisture;
		this.MinimumMoisture = MinimumMoisture;

		this.MaximumTemp = MaximumTemp;
		this.MinimumTemp = MinimumTemp;

		this.RandomObjects = RandomObjects;

		this.GroundMaterialDefault = GroundMaterialDefault;

		this.BiomeEnum = BiomeEnum;
	}
	MaximumElevation: number;
	MinimumElevation: number;

	MaximumMoisture: number;
	MinimumMoisture: number;

	MaximumTemp: number;
	MinimumTemp: number;

	RandomObjects: ITerrainObject[];

	GroundMaterialDefault: Enum.Material;

	BiomeEnum: BiomeType;
}