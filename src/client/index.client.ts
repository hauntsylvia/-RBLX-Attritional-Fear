import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { ServerTerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { TerrainFollower } from "../shared/classes/in game/terrain/TerrainFollower";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoACamera } from "./classes/camera/FoACamera";
import { LevelOfZoom } from "./classes/camera/LevelOfZoom";
import { FoAClient } from "./classes/clients/FoAClient";
import { RenderTerrainResult } from "./classes/processor results/RenderTerrainResult";

const SizeStartingArea = 32000;

print("Constructing client . .");
const Client = new FoAClient(game.GetService("ReplicatedStorage").WaitForChild("API", 2) as RemoteFunction);
Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(new Hotkeys()));
print("Client constructed.");

print("Loading spawn . .");
let Time = os.clock();
let StartingArea = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(-SizeStartingArea, -SizeStartingArea, SizeStartingArea, SizeStartingArea), 5, 25);
StartingArea.WaitUntilDone();
print("[" + (os.clock() - Time) + "] seconds to load [" + SizeStartingArea*2 + "x" + SizeStartingArea*2 + "] studs. Upscaled by [x" + Client.TerrainProcessor.MapData.SizePerCell  +"]");
print("Spawn loaded.");


print("Connecting camera chunker . .");
Client.TerrainChunker.Connect();
print("Camera chunker connected.");

export {};