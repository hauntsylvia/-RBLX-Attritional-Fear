import { Server } from "./classes/server communication/Server";
import { TerrainHelper } from "./classes/terrain/TerrainHelper";

Server.Main();
new TerrainHelper().Connect();

export {};