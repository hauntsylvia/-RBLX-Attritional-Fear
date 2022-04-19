import { NoiseHelper } from "../shared/classes/in game/terrain/NoiseHelper";
import { Biome } from "../shared/classes/in game/terrain/specifics/biomes/Biome";
import { Church } from "../shared/classes/in game/terrain/specifics/objects/Church";
import { Tree } from "../shared/classes/in game/terrain/specifics/objects/Tree";
import { TerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { TerrainHelper } from "../shared/classes/in game/terrain/TerrainHelper";
import { Biomes } from "../shared/consts/Biomes";
import { BiomeTypes, TreeTypes } from "../shared/consts/Enums";
import { Server } from "./classes/server communication/Server";

Server.Main();

let R = new Random();
let EleMapZ = R.NextInteger(1, 10 ^ 6);
let EleMap = new NoiseHelper(EleMapZ, 200, 200, 2);
let MoistureMap = new NoiseHelper(R.NextInteger(1, 10 ^ 6), 200, 200, 2);
let TempMap = new NoiseHelper(R.NextInteger(1, 10 ^ 6), 200, 200, 2);
//let EleMap = new NoiseHelper(1, 200, 200, 2);
//let MoistureMap = new NoiseHelper(1, 200, 200, 2);
//let TempMap = new NoiseHelper(1, 200, 200, 2);
const THelper = new TerrainHelper(new TerrainRequest(EleMap, MoistureMap, TempMap, 5, 3))

THelper.Render(0, 0, 200, 200, Biomes.AllBiomes, Biomes.FallbackBiome, 0.3);

export {};