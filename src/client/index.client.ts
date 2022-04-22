import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
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
	//let T = os.clock();
	//RenderReq?.WaitUntilDone();
	//print(os.clock() - T);
	let LastCF: CFrame = Camera.CurrentCamera.CFrame;
	let RenderAmount = 200;
	let ChunkSize = 400;
	//let RenderReq = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(-150, -150, 150, 150), 50);
	//RenderReq?.Run();
	while(true)
	{
		let NewCF = Camera.CurrentCamera.CFrame.mul(new CFrame(0, 0, -Camera.CurrentCamera.CFrame.Position.Y));
		let X = math.round(NewCF.X - RenderAmount);
		let Z = math.round(NewCF.Position.Z - RenderAmount);
		let XTo = math.round(NewCF.Position.X + RenderAmount);
		let ZTo = math.round(NewCF.Position.Z + RenderAmount);
		LastCF = NewCF;
		if (!Camera.HasVelocity() || LastCF.Position.sub(NewCF.Position).Magnitude > 15)
		{
			Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), ChunkSize);
			RenderAmount = RenderAmount * Camera.CurrentCamera.CFrame.Position.Y / 4;
		}
		else
		{
			RenderAmount = 200;
			Client.TerrainProcessor.StopCurrentRendering();
			Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), ChunkSize);
		}
		wait();
	};
}

export {};