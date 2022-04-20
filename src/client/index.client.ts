import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoACamera } from "./classes/camera/FoACamera";
import { LevelOfZoom } from "./classes/camera/LevelOfZoom";
import { FoAClient } from "./classes/clients/FoAClient";

const Client = new FoAClient(game.GetService("ReplicatedStorage").WaitForChild("API", 2) as RemoteFunction);
let RegPlr = Client.PlayerProcessor.GetCurrentPlayer();
let LPlr = game.GetService("Players").LocalPlayer;
Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(new Hotkeys(undefined)));
if(RegPlr.Returned !== undefined)
{
	print("C");
	while (LPlr.Character === undefined) { wait(); };
	let Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), RegPlr.Returned.FoAPlayerSettings);
	Camera.Connect();

	Client.TerrainProcessor.RenderTerrain(0, 0, 100, 100, 10);
}

export {};