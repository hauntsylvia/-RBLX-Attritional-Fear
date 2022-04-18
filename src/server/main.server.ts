import { Biome } from "../shared/classes/in game/terrain/specifics/biomes/Biome";
import { Tree } from "../shared/classes/in game/terrain/specifics/objects/Tree";
import { TerrainHelper } from "../shared/classes/in game/terrain/TerrainHelper";
import { Biomes } from "../shared/consts/Enums";
import { Server } from "./classes/server communication/Server";

Server.Main();
wait(2);
new TerrainHelper().Connect([new Biome(0, 0, 0, 0, 0, 0, [new Tree(0, 3), new Tree(1, 3), new Tree(2, 3)], Enum.Material.Grass, Biomes.Forest)]);

export {};