import { Biome } from "../classes/in game/terrain/specifics/biomes/Biome";
import { BiomeAtmosphere, BiomeAtmospherePresets } from "../classes/in game/terrain/specifics/biomes/BiomeAtmosphere";
import { Church } from "../classes/in game/terrain/specifics/objects/Church";
import { Tree } from "../classes/in game/terrain/specifics/objects/Tree";
import { BiomeType, TreeType } from "./Enums";

const AllBiomes: Biome[] =
	[
		new Biome(0.5, 0.05, 1.0, 0.25, 1.0, 0.5,
			[new Tree(TreeType.Tree1), new Tree(TreeType.Tree2), new Tree(TreeType.Tree3)],
			Enum.Material.Mud, BiomeType.Beach,
			BiomeAtmospherePresets.DeepGrunge),

		new Biome(0.8, 0.05, 1.0, 0.1, 1.0, 0.0,
			[new Tree(TreeType.Tree1), new Tree(TreeType.Tree2), new Tree(TreeType.Tree3)],
			Enum.Material.Grass, BiomeType.Forest,
			BiomeAtmospherePresets.DeepGrunge),
	];

const FallbackBiome = new Biome(1, 0, 1, 0, 1, 0,
	[new Tree(TreeType.Tree1), new Tree(TreeType.Tree2), new Tree(TreeType.Tree3)],
	Enum.Material.Grass, BiomeType.Forest,
	BiomeAtmospherePresets.DeepGrunge);

const MaxModelSize = 1.1;
const MinimumModelSize = 0.5;

export { AllBiomes, FallbackBiome, MaxModelSize, MinimumModelSize };