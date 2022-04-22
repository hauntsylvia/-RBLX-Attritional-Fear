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
	//let RenderReq = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(-100, -100, 100, 100), 50, 10);
	let LastCF: CFrame = Camera.CurrentCamera.CFrame;
	let ChunkSize = 0;
	let RenderAmount = 50;
	let IdleRenderer: RenderTerrainResult = new RenderTerrainResult([]);
	while(true)
	{
		ChunkSize = Camera.HasVelocity() ? 75 : 75;
		let NewCF = Camera.CurrentCamera.CFrame.mul(new CFrame(0, 0, -300));
		let X = math.round(NewCF.X - RenderAmount);
		let Z = math.round(NewCF.Position.Z - RenderAmount);
		let XTo = math.round(NewCF.Position.X + RenderAmount);
		let ZTo = math.round(NewCF.Position.Z + RenderAmount);
		if (!Camera.HasVelocity() || LastCF.Position.sub(NewCF.Position).Magnitude > 15)
		{
			LastCF = NewCF;
			if (IdleRenderer.Dead())
			{
				let N = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), ChunkSize, 100);
				if (N !== undefined)
				{
					IdleRenderer = N;
					N.Run();
				}
				RenderAmount += 300;
			}
		}
		else
		{
			RenderAmount = 300;
			IdleRenderer.Kill();
			let R = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(NewCF.Position.X - 50, NewCF.Position.Z - 50, NewCF.Position.X + 50, NewCF.Position.Z + 50), 100, 100);
			if (R !== undefined)
			{
				R?.Run();
				while (!R.Dead()) { wait(); }
			}
		}
		wait();
	};
}

export {};