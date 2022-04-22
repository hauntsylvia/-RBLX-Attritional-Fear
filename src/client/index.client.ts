import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { ServerTerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoACamera } from "./classes/camera/FoACamera";
import { LevelOfZoom } from "./classes/camera/LevelOfZoom";
import { FoAClient } from "./classes/clients/FoAClient";
import { RenderTerrainResult } from "./classes/processor results/RenderTerrainResult";

const Client = new FoAClient(game.GetService("ReplicatedStorage").WaitForChild("API", 2) as RemoteFunction);
let RegPlr = Client.PlayerProcessor.GetCurrentPlayer();
let LPlr = game.GetService("Players").LocalPlayer;
Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(new Hotkeys()));
if(RegPlr.Returned !== undefined)
{
	while (LPlr.Character === undefined) { wait(); };
	let Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), RegPlr.Returned.FoAPlayerSettings);
	Camera.Connect();
	//let RenderReq = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(-100, -100, 100, 100), 50, 10);
	let LastCf: CFrame = Camera.CurrentCamera.CFrame;
	let LastRender: RenderTerrainResult = new RenderTerrainResult([]);
	let ChunkSize = 50;
	let RenderAmount = 250;
	while (true)
	{
		RenderAmount = Camera.HasVelocity() ? 50 : RenderAmount < 1000 ? RenderAmount + 50 : RenderAmount;
		let X = math.round(LastCf.X - RenderAmount);
		let Z = math.round(LastCf.Position.Z - RenderAmount);
		let XTo = math.round(LastCf.X + RenderAmount * 2);
		let ZTo = math.round(LastCf.Position.Z + RenderAmount * 2);
		let NewCf = Camera.CurrentCamera.CFrame;
		let NewRender = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), ChunkSize, 100);
		if (!Camera.HasVelocity())
		{
			ChunkSize = 50;
			RenderAmount += 250;
			if (NewRender !== undefined && (LastRender.ThreadsKilled || LastRender.Dead() || !LastRender.Running))
			{
				LastRender = NewRender;
				LastRender.Run();
			}
		}
		else
		{
			LastCf = NewCf;
			ChunkSize = 25;
			RenderAmount = 100;
			LastRender.Kill();
			NewRender?.WaitUntilDone();
		}
		wait(0.1);
	}
}

export {};