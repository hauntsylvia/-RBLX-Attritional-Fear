import { FoACamera } from "../../../../client/classes/camera/FoACamera";
import { FoAClient } from "../../../../client/classes/clients/FoAClient";
import { RenderTerrainResult } from "../../../../client/classes/processor results/RenderTerrainResult";
import { TerrainProcessor } from "../../../../client/classes/processors/TerrainProcessor";
import { ChunkSettings } from "../players/personalizations/specifics/ChunkSettings";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";
import { ServerTerrainRequest } from "./specifics/regions/ServerTerrainRequest";

export class TerrainFollower
{
	constructor (Camera: FoACamera, TerrainP: TerrainProcessor, Settings?: ChunkSettings, ChunkSize: number = 50)
	{
		this.Follow = Camera;
		this.TerrainP = TerrainP;
		this.Settings = Settings ?? new ChunkSettings();
		this.RenderAmount = this.Settings.ChunkDistancePerCycle;
		this.ChunkSize = ChunkSize;
		this.TimePerContentStreamUpdate = this.Settings.SecondsPerCycle;
		this.Plr = game.GetService("Players").LocalPlayer;;
	}

	Follow: FoACamera;

	TerrainP: TerrainProcessor;

	Settings: ChunkSettings;

	RenderAmount: number;

	ChunkSize: number;

	TimePerContentStreamUpdate: number;

	private Signal?: RBXScriptConnection;

	private Plr: Player;

	Connect ()
	{
		this.Signal = game.GetService("Workspace").StreamingEnabled ? game.GetService("RunService").RenderStepped.Connect((Dt) => this.RenderStepped(Dt)) : undefined;
	}

	Disconnect ()
	{
		this.Signal?.Disconnect();
	}

	RenderRes?: RenderTerrainResult;
	Step: number = 0;
	RenderStepped (DeltaTime: number)
	{
		if (this.Step >= this.TimePerContentStreamUpdate)
		{
			this.Step = 0;
			this.Plr.RequestStreamAroundAsync(this.Follow.CurrentCamera.CFrame.Position);
			if (this.RenderRes === undefined || (this.RenderRes !== undefined && this.RenderRes.Dead()))
			{
				let SpawnLoc = this.Follow.CurrentCamera.CFrame.Position;
				let ChunkSize = 1;
				let FrameSkips = 60;
				let StartPos = new Vector2((SpawnLoc.X - this.RenderAmount), (SpawnLoc.Z - this.RenderAmount));
				let EndPos = new Vector2((SpawnLoc.X + this.RenderAmount), (SpawnLoc.Z + this.RenderAmount));
				let Time = os.clock();
				this.RenderRes = this.TerrainP.RenderTerrain(new ServerTerrainRequest(StartPos.X, StartPos.Y, EndPos.X, EndPos.Y), FrameSkips, ChunkSize);
			}
		}
		else
		{
			this.Step += DeltaTime;
		}
	}
}