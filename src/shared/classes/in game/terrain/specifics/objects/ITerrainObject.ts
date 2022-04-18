import { Biomes } from "../../../../../consts/Enums";

export interface ITerrainObject
{
	BiomesAndRarity: Map<Biomes, number>;
	Model: Model;
	YOffset: number;
}