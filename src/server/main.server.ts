import { TerrainHelper } from "../shared/classes/in game/terrain/TerrainHelper";
import { Server } from "./classes/server communication/Server";

Server.Main();
new TerrainHelper().Connect();

export {};