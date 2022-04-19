import { Biome } from "../classes/in game/terrain/specifics/biomes/Biome";
import { Church } from "../classes/in game/terrain/specifics/objects/Church";
import { Tree } from "../classes/in game/terrain/specifics/objects/Tree";
import { BiomeTypes, TreeTypes } from "./Enums";

export class Biomes
{
	static AllBiomes: Biome[] =
		[
			new Biome(0.15, 0.05, 1.0, 0.0, 1.0, 0.5, [], Enum.Material.Sand, BiomeTypes.Beach),
			new Biome(0.15, 0.05, 1.0, 0.0, 0.5, 0.0, [], Enum.Material.Rock, BiomeTypes.Beach),
			new Biome(0.2, 0.15, 1.0, 0.0, 1.0, 0.5, [], Enum.Material.Mud, BiomeTypes.Beach),
			new Biome(0.2, 0.15, 1.0, 0.0, 0.5, 0.0, [], Enum.Material.Rock, BiomeTypes.Beach),

			new Biome(0.97, 0.8, 1.0, 0.0, 1.0, 0.0, [], Enum.Material.Rock, BiomeTypes.Beach),
			new Biome(1.0, 0.97, 1.0, 0.0, 1.0, 0.0, [], Enum.Material.Snow, BiomeTypes.Beach),

			new Biome(0.8, 0.2, 1.0, 0.0, 0.5, 0.0, [new Tree(TreeTypes.SnowTree1, 3)], Enum.Material.Snow, BiomeTypes.SnowForest),
			new Biome(0.8, 0.2, 1.0, 0.0, 1.0, 0.0, [new Church(-5), new Tree(0, 3), new Tree(1, 3), new Tree(2, 3)], Enum.Material.Grass, BiomeTypes.Forest),
		];
	
	static FallbackBiome = new Biome(0, 0, 0, 1, 0.1, 1, [], Enum.Material.Water, BiomeTypes.Ocean);
}