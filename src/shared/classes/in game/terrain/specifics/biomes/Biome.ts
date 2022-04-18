import { Biomes } from "../../../../../consts/Enums";
import { ITerrainObject } from "../objects/ITerrainObject";

export class Biome
{
	constructor (MinimumMoisture: number, MinimumElevation: number, MinimumTemp: number, MaximumMoisture: number, MaximumElevation: number, MaximumTemp: number, RandomObjects: ITerrainObject[], GroundMaterialDefault: Enum.Material, BiomeEnum: Biomes)
	{
		this.MinimumMoisture = MinimumMoisture;
		this.MinimumElevation = MinimumElevation;
		this.MinimumTemp = MinimumTemp;

		this.MaximumMoisture = MaximumMoisture;
		this.MaximumElevation = MaximumElevation;
		this.MaximumTemp = MaximumTemp;

		this.RandomObjects = RandomObjects;

		this.GroundMaterialDefault = GroundMaterialDefault;

		this.BiomeEnum = BiomeEnum;
	}

	MinimumMoisture: number;
	MinimumElevation: number;
	MinimumTemp: number;

	MaximumMoisture: number;
	MaximumElevation: number;
	MaximumTemp: number;

	RandomObjects: ITerrainObject[];

	GroundMaterialDefault: Enum.Material;

	BiomeEnum: Biomes;
}