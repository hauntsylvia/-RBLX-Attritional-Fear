import { Biome } from "../classes/in game/terrain/specifics/biomes/Biome";
import { Church } from "../classes/in game/terrain/specifics/objects/Church";
import { Tree } from "../classes/in game/terrain/specifics/objects/Tree";
import { BiomeTypes, TreeTypes } from "./Enums";

const AllBiomes: Biome[] =
	[
		new Biome(0.15, 0.05, 1.0, 0.0, 1.0, 0.5, [], Enum.Material.Sand, BiomeTypes.Beach),
		new Biome(0.2, 0.05, 1.0, 0.0, 1.0, 0.5, [], Enum.Material.Mud, BiomeTypes.Beach),

		//new Biome(1.0, 0.97, 1.0, 0.0, 1.0, 0.0, [], Enum.Material.Snow, BiomeTypes.MountainTop),

		new Biome(0.8, 0.05, 1.0, 0.1, 0.5, 0.0, [new Tree(TreeTypes.SnowTree1, 2)], Enum.Material.Snow, BiomeTypes.SnowForest),
		new Biome(0.8, 0.05, 1.0, 0.1, 1.0, 0.0, [new Tree(0, 2), new Tree(1, 2), new Tree(2, 2)], Enum.Material.Grass, BiomeTypes.Forest),

		new Biome(1.0, 0.05, 1.0, 0.0, 1.0, 0.0, [], Enum.Material.Rock, BiomeTypes.MountainTop),
	];

const FallbackBiome = new Biome(0, 0, 1, 0, 0.5, 0, [new Church(2), new Tree(0, 2), new Tree(1, 2), new Tree(2, 2)], Enum.Material.LeafyGrass, BiomeTypes.Forest);
const ModelSize = 1;

export { AllBiomes, FallbackBiome, ModelSize };