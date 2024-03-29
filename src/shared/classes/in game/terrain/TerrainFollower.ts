import { FoACamera } from "../../../../client/classes/camera/FoACamera";
import { FoAClient } from "../../../../client/classes/clients/FoAClient";
import { ISettingsInvolved } from "../../../../client/classes/clients/ISettingsInvolved";
import { RenderTerrainResult } from "../../../../client/classes/processor classes/RenderTerrainResult";
import { TerrainProcessor } from "../../../../client/classes/processors/TerrainProcessor";
import { FoAPlayerSettings } from "../players/personalizations/FoAPlayerSettings";
import { ChunkSettings } from "../players/personalizations/specifics/ChunkSettings";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";
import { ServerTerrainRequest } from "./specifics/regions/ServerTerrainRequest";

export class TerrainFollower implements ISettingsInvolved
{
	constructor (Camera: FoACamera, Settings: FoAPlayerSettings, TerrainP?: TerrainProcessor)
	{
		this.Follow = Camera;
		this.TerrainP = TerrainP;
		this.LoadNewSettings(Settings);
		this.Plr = game.GetService("Players").LocalPlayer;
		this.DoTerrain = TerrainP !== undefined;
	}

	Follow: FoACamera;

	TerrainP?: TerrainProcessor;

	RenderAmount: number = 500;

	ChunkSize: number = 1;

	TimePerContentStreamUpdate: number = 2;

	DoTerrain: boolean = true;

	private Signal?: RBXScriptConnection;

	private Plr: Player;

	Connect ()
	{
		this.Signal = game.GetService("RunService").RenderStepped.Connect((Dt) => this.RenderStepped(Dt));
	}

	Disconnect ()
	{
		this.Signal?.Disconnect();
	}

	LoadNewSettings (Settings: FoAPlayerSettings) 
	{
		//this.RenderAmount = (Settings.ChunkSettings ?? new ChunkSettings()).ChunkDistancePerCycle;
		//this.TimePerContentStreamUpdate = (Settings.ChunkSettings ?? new ChunkSettings()).SecondsPerCycle;
	}

	RenderRes?: RenderTerrainResult;
	Step: number = 0;
	RenderStepped (DeltaTime: number)
	{
		if (this.Step >= this.TimePerContentStreamUpdate)
		{
			this.Step = 0;
			let REQ = game.GetService("Workspace").StreamingEnabled ? this.Plr.RequestStreamAroundAsync(this.Follow.CurrentCamera.CFrame.Position) : undefined;
			if (this.TerrainP !== undefined && (this.RenderRes === undefined || (this.RenderRes !== undefined && this.RenderRes.Dead())))
			{
				let SpawnLoc = this.Follow.CurrentCamera.CFrame.mul(new CFrame(this.RenderAmount / 2, 0, 0));
				print(SpawnLoc.LookVector);
				let ChunkSize = 1;
				let ChunkUpdates = 50;
				let StartPos = new Vector2((SpawnLoc.X - this.RenderAmount), (SpawnLoc.Z - this.RenderAmount));
				let EndPos = new Vector2((SpawnLoc.X + this.RenderAmount), (SpawnLoc.Z + this.RenderAmount));
				this.RenderRes = this.TerrainP.RenderTerrain(new ServerTerrainRequest(StartPos.X, StartPos.Y, EndPos.X, EndPos.Y), ChunkUpdates, ChunkSize);
			}
		}
		else
		{
			this.Step += DeltaTime;
		}
	}
}