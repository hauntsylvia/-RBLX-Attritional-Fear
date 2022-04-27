import { Biome } from "../classes/in game/terrain/specifics/biomes/Biome";
import { Church } from "../classes/in game/terrain/specifics/objects/Church";
import { Tree } from "../classes/in game/terrain/specifics/objects/Tree";
import { BiomeTypes, TreeTypes } from "./Enums";

const AllBiomes: Biome[] =
	[
		new Biome(0.5, 0.05, 1.0, 0.25, 1.0, 0.5,
			[new Tree(TreeTypes.Tree1), new Tree(TreeTypes.Tree2), new Tree(TreeTypes.Tree3)],
			Enum.Material.Mud, BiomeTypes.Beach),

		new Biome(0.8, 0.05, 1.0, 0.1, 0.5, 0.0,
			[new Tree(TreeTypes.SnowTree1)],
			Enum.Material.Snow, BiomeTypes.SnowForest),

		new Biome(0.8, 0.05, 1.0, 0.1, 1.0, 0.0,
			[new Tree(TreeTypes.Tree1), new Tree(TreeTypes.Tree2), new Tree(TreeTypes.Tree3)],
			Enum.Material.Grass, BiomeTypes.Forest),
	];

const FallbackBiome = new Biome(1, 0, 1, 0, 1, 0,
	[new Tree(TreeTypes.Tree1), new Tree(TreeTypes.Tree2), new Tree(TreeTypes.Tree3)],
	Enum.Material.Grass, BiomeTypes.Forest);

const MaxModelSize = 1.1;
const MinimumModelSize = 0.5;

export { AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize };