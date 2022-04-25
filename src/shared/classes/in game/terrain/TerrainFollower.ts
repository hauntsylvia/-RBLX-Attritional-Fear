import { FoACamera } from "../../../../client/classes/camera/FoACamera";
import { FoAClient } from "../../../../client/classes/clients/FoAClient";
import { TerrainProcessor } from "../../../../client/classes/processors/TerrainProcessor";
import { ServerTerrainRequest } from "./specifics/regions/ServerTerrainRequest";

export class TerrainFollower
{
	constructor (Camera: FoACamera, TerrainP: TerrainProcessor, RenderAmount: number = 100, ChunkSize: number = 50, MagnitudeBeforeRequestingContentStream: number = 15)
	{
		this.Follow = Camera;
		this.TerrainP = TerrainP;
		this.RenderAmount = RenderAmount;
		this.ChunkSize = ChunkSize;
		this.MagnitudeBeforeRequestingContentStream = MagnitudeBeforeRequestingContentStream;
	}

	Follow: FoACamera;
	TerrainP: TerrainProcessor;
	RenderAmount: number;
	ChunkSize: number;
	MagnitudeBeforeRequestingContentStream: number;
	private Kill: boolean = false;
	private LastPositionBeforeMagChange: Vector3 = Vector3.zero;

	Connect ()
	{
		this.Kill = false;
		coroutine.resume(coroutine.create(() =>
		{
			let LastCF = new CFrame(0, 0, 0);
			while (!this.Kill)
			{
				let NewCF = this.Follow.CurrentCamera.CFrame;
				if (this.Follow.HasVelocity() || LastCF.Position.sub(NewCF.Position).Magnitude > 15)
				{
					let Distance = NewCF.sub(LastCF.Position).Position;
					let MovingCF = new CFrame(NewCF.Position, Distance.add(NewCF.Position)).mul(new CFrame(0, 0, -this.RenderAmount / 2));
					LastCF = NewCF;
					let XTo = math.round(MovingCF.Position.X);
					let ZTo = math.round(MovingCF.Position.Z);
					let X = math.round(XTo / 2);
					let Z = math.round(ZTo / 2);
					this.TerrainP.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), 1, this.ChunkSize + NewCF.Position.Y);
				}
				else
				{
					let XTo = math.round(NewCF.mul(new CFrame(0, 0, -this.RenderAmount)).Position.X);
					let ZTo = math.round(NewCF.mul(new CFrame(0, 0, -this.RenderAmount)).Position.Z);
					let X = XTo - 250;
					let Z = ZTo - 1000;
					this.RenderAmount = 200;
					this.TerrainP.StopCurrentRendering();
					this.TerrainP.RenderTerrain(new ServerTerrainRequest(X, Z, XTo, ZTo), 1, this.ChunkSize);
				}
				this.RenderAmount = this.RenderAmount + 200;
				wait();
			}
		}));
		coroutine.resume(coroutine.create(() =>
		{
			let Plr = game.GetService("Players").LocalPlayer;
			if (this.Follow.CurrentCamera.CFrame.Position.sub(this.LastPositionBeforeMagChange).Magnitude > this.MagnitudeBeforeRequestingContentStream)
			{
				this.LastPositionBeforeMagChange = this.Follow.CurrentCamera.CFrame.Position;
				print("Requesting stream . .");
				Plr.RequestStreamAroundAsync(this.Follow.CurrentCamera.CFrame.Position);
				print("Stream requested.");
			}
		}));
	}

	Disconnect ()
	{
		this.Kill = true;
	}
}