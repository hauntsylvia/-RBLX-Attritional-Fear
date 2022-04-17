import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { CameraHotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/hotkeys/CameraHotkeys";
import { SelfFoAPlayer } from "../../../shared/classes/in game/players/SelfFoAPlayer";
import { CollisionCalculator } from "../../../shared/classes/util/Collisions/CollisionCalculator";
import { EnumParser } from "../../../shared/classes/util/EnumParser";
import { LevelOfZoom } from "./LevelOfZoom";

export class FoACamera // Omar, PhD* says hi
{
	static ThisRenderStepLabel: string = "CameraOperation";

	constructor (CurrentLoZ: LevelOfZoom, Settings: FoAPlayerSettings, LocalCamera?: Camera | undefined)
	{
		this.LevelsOfZoom = [CurrentLoZ];
		this.LoadNewSettings(Settings.Hotkeys);
		this.CurrentCamera = LocalCamera ?? game.GetService("Workspace").CurrentCamera ?? error("No valid camera found.");
		this.InputService = game.GetService("UserInputService");
	}

	LevelsOfZoom: LevelOfZoom[];

	CurrentCamera: Camera;

	InputChangedConnection: RBXScriptConnection | undefined;

	InputService: UserInputService;

	MoveForward!: Enum.KeyCode;
	MoveBackward!: Enum.KeyCode;
	MoveLeft!: Enum.KeyCode;
	MoveRight!: Enum.KeyCode;
	RotateLeft!: Enum.KeyCode;
	RotateRight!: Enum.KeyCode;

	ForwardVelocity: number = 0;
	RightVelocity: number = 0;
	RightRotationVelocity: number = 0;
	InwardVelocity: number = 0;

	CameraSpeed: number = 2000;
	CameraZoomSteps: number = 30;

	MinZoom: number = 10;
	MaxZoom: number = 100;
	MinObjectDistance: number = 20;

	IsMoving ()
	{
		return this.ForwardVelocity !== 0 && this.InwardVelocity !== 0 && this.RightVelocity !== 0 && this.RightRotationVelocity !== 0;
	}

	LoadNewSettings (Settings: Hotkeys)
	{
		let Hk: CameraHotkeys = Settings.CameraHotkeys;
		let ForwardEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveForward);
		let BackwardEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveBackward);
		let LeftEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveLeft);
		let RightEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveRight);
		let RotateLeft = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.RotateLeft);
		let RotateRight = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.RotateRight);
		if (ForwardEnum !== undefined && BackwardEnum !== undefined && LeftEnum !== undefined && RightEnum !== undefined && RotateLeft !== undefined && RotateRight !== undefined)
		{
			this.MoveForward = ForwardEnum;
			this.MoveBackward = BackwardEnum;
			this.MoveLeft = LeftEnum;
			this.MoveRight = RightEnum;
			this.RotateLeft = RotateLeft;
			this.RotateRight = RotateRight;
		}
		else
		{
			this.LoadNewSettings(new Hotkeys())
		}
		this.CameraSpeed = Hk.CameraSpeed * this.CameraSpeed;
		this.CameraZoomSteps = Hk.CameraZoomSensitivity * this.CameraZoomSteps;
	}

	Connect ()
	{
		this.InputChangedConnection = this.InputService.InputChanged.Connect((Inp, GameProc) => this.MouseScrollSet(Inp, GameProc))
		this.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
		this.CurrentCamera.CFrame = new CFrame(0, this.LevelsOfZoom[0].CameraDistance, 0);
		this.CurrentCamera.CameraSubject = undefined;
		game.GetService("RunService").BindToRenderStep(FoACamera.ThisRenderStepLabel, Enum.RenderPriority.Camera.Value, (DT) => this.RenderStepped(DT));
	}

	Disconnect ()
	{
		game.GetService("RunService").UnbindFromRenderStep(FoACamera.ThisRenderStepLabel);
		if (this.InputChangedConnection !== undefined)
		{
			this.InputChangedConnection.Disconnect();
		}
	}

	MouseScrollSet (InputObject: InputObject, GameProc: boolean)
	{
		if (InputObject.UserInputType === Enum.UserInputType.MouseWheel && !GameProc)
		{
			this.InwardVelocity = (InputObject.UserInputState === Enum.UserInputState.Change ? (InputObject.Position.Z > 0 ? -1 : InputObject.Position.Z < 0 ? 1 : 0) : (0));
		}
	}

	UpdateCamera (MoveTo: CFrame)
	{
		if (this.IsMoving())
		{
			this.CurrentCamera.CFrame = MoveTo;
		}
		else
		{
			this.CurrentCamera.CFrame = this.CurrentCamera.CFrame.Lerp(MoveTo, 0.05);
		}
	}

	RenderStepped (DeltaTime: number)
	{
		let CameraSpeedFrame = this.CameraSpeed * DeltaTime;

		let ForwardMove: boolean = this.InputService.IsKeyDown(this.MoveForward);
		let BackwardMove: boolean = this.InputService.IsKeyDown(this.MoveBackward);
		let RightMove: boolean = this.InputService.IsKeyDown(this.MoveRight);
		let LeftMove: boolean = this.InputService.IsKeyDown(this.MoveLeft);
		let RightRotate: boolean = this.InputService.IsKeyDown(this.RotateRight);
		let LeftRotate: boolean = this.InputService.IsKeyDown(this.RotateLeft);

		this.ForwardVelocity = (ForwardMove && !BackwardMove ? 1 : !ForwardMove && BackwardMove ? -1 : 0) * CameraSpeedFrame;
		this.RightVelocity = (RightMove && !LeftMove ? 1 : !RightMove && LeftMove ? -1 : 0) * CameraSpeedFrame;
		this.RightRotationVelocity = (RightRotate && !LeftRotate ? 1 : !RightRotate && LeftRotate ? -1 : 0) * CameraSpeedFrame;

		let CollisionResult = CollisionCalculator.HasNearbyEntities(this.CurrentCamera.CFrame, this.MinObjectDistance);

		this.ForwardVelocity = CollisionResult.Result !== undefined ? CollisionResult.Result.Position.Z - this.MinObjectDistance : this.ForwardVelocity;
		this.RightVelocity = CollisionResult.Result !== undefined ? CollisionResult.Result.Position.X - this.MinObjectDistance : this.RightVelocity;
		this.InwardVelocity = CollisionResult.Result !== undefined && CollisionResult.Result.Position.Y - this.CurrentCamera.CFrame.Y < 0 ? -0.5 : CollisionResult.Result !== undefined && CollisionResult.Result.Position.Y - this.CurrentCamera.CFrame.Y > 0 ? 0.5 : this.InwardVelocity;

		if (this.CurrentCamera.CFrame.Y >= this.MaxZoom)
		{
			this.InwardVelocity = -0.5;
		}
		else if (this.CurrentCamera.CFrame.Y <= this.MinZoom)
		{
			this.InwardVelocity = 0.5;
		}

		let CameraZoomVisualTotal = this.InwardVelocity * this.CameraZoomSteps;// * (DeltaTime * 6.25);
		let CurrentLoZ: LevelOfZoom = this.LevelsOfZoom[0];
		let CurrentCF: CFrame = new CFrame(this.CurrentCamera.CFrame.Position);
		let NewCF: CFrame = new CFrame((CurrentCF.LookVector.mul(this.ForwardVelocity).add(CurrentCF.RightVector.mul(this.RightVelocity)))).mul(CurrentCF).mul(CFrame.Angles(math.rad(-CurrentLoZ.CameraAngle), 0, 0)).add(new Vector3(0, CameraZoomVisualTotal, CameraZoomVisualTotal));


		this.UpdateCamera(NewCF);

		this.InwardVelocity = this.InwardVelocity - this.InwardVelocity * DeltaTime * 12.5;
		//this.InwardVelocity = 0;
	}
}