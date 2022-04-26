import { FoACamera } from "../../../../client/classes/camera/FoACamera";
import { FoAClient } from "../../../../client/classes/clients/FoAClient";
import { TerrainProcessor } from "../../../../client/classes/processors/TerrainProcessor";
import { ServerTerrainRequest } from "./specifics/regions/ServerTerrainRequest";

export class TerrainFollower
{
	constructor (Camera: FoACamera, TerrainP: TerrainProcessor, RenderAmount: number = 100, ChunkSize: number = 50, TimePerContentStreamUpdate: number = 15)
	{
		this.Follow = Camera;
		this.TerrainP = TerrainP;
		this.RenderAmount = RenderAmount;
		this.ChunkSize = ChunkSize;
		this.TimePerContentStreamUpdate = TimePerContentStreamUpdate;
		this.Plr = game.GetService("Players").LocalPlayer;;
	}

	Follow: FoACamera;

	TerrainP: TerrainProcessor;

	RenderAmount: number;

	ChunkSize: number;

	TimePerContentStreamUpdate: number;

	private Signal?: RBXScriptConnection;

	private LastPositionBeforeMagChange: Vector3 = Vector3.zero;

	private Plr: Player;

	Connect ()
	{
		this.Signal = game.GetService("Workspace").StreamingEnabled ? game.GetService("RunService").RenderStepped.Connect((Dt) => this.RenderStepped(Dt)) : undefined;
	}

	Disconnect ()
	{
		this.Signal?.Disconnect();
	}

	Step: number = 0;
	RenderStepped (DeltaTime: number)
	{
		if (this.Step >= this.TimePerContentStreamUpdate)
		{
			this.Step = 0;
			this.LastPositionBeforeMagChange = this.Follow.CurrentCamera.CFrame.Position;
			this.Plr.RequestStreamAroundAsync(this.Follow.CurrentCamera.CFrame.Position);
		}
		else
		{
			this.Step += DeltaTime;
		}
	}
}