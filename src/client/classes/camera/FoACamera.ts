import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { CameraHotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/hotkeys/CameraHotkeys";
import { SelfFoAPlayer } from "../../../shared/classes/in game/players/SelfFoAPlayer";
import { CollisionCalculator } from "../../../shared/classes/util/collisions/CollisionCalculator";
import { EnumParser } from "../../../shared/classes/util/EnumParser";
import { ISettingsInvolved } from "../clients/ISettingsInvolved";
import { LevelOfZoom } from "./LevelOfZoom";

export class FoACamera implements ISettingsInvolved // Omar, PhD says hi
{
	constructor (CurrentLoZ: LevelOfZoom, Settings: FoAPlayerSettings, LocalCamera?: Camera)
	{
		this.LevelsOfZoom = [CurrentLoZ];
		this.LoadNewSettings(Settings);
		this.CurrentCamera = LocalCamera ?? game.GetService("Workspace").CurrentCamera ?? error("No valid camera found.");
		this.InputService = game.GetService("UserInputService");
		this.Player = game.GetService("Players").LocalPlayer;
	}

	static ThisRenderStepLabel: string = "CameraOperation";

	LevelsOfZoom: LevelOfZoom[];

	CurrentCamera: Camera;

	InputChangedConnection?: RBXScriptConnection;

	InputService: UserInputService;

	Player: Player;

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
	ImmediateInwardVelocity: number = 0;

	CanHaveVelocity: boolean = true;

	CameraSpeed: number = 750;
	CameraZoomSteps: number = 80;
	CameraYAngle: number = 0;

	MinZoom: number = 50;
	MaxZoom: number = 300;

	DisableVelocity ()
	{
		this.ForwardVelocity = 0;
		this.RightVelocity = 0;
		this.RightRotationVelocity = 0;
		this.InwardVelocity = 0;
		this.ImmediateInwardVelocity = 0;
		this.CanHaveVelocity = false;
	}

	EnableVelocity ()
	{
		this.CanHaveVelocity = true;
	}

	HasVelocity ()
	{
		return this.ForwardVelocity !== 0 || this.ImmediateInwardVelocity !== 0 || this.RightVelocity !== 0 || this.RightRotationVelocity !== 0;
	}

	LoadNewSettings (Settings: FoAPlayerSettings)
	{
		let Hk: CameraHotkeys = (Settings.Hotkeys ?? new Hotkeys()).CameraHotkeys;
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
			Settings.Hotkeys = new Hotkeys();
			this.LoadNewSettings(Settings);
		}
		this.CameraSpeed = Hk.CameraSpeed * this.CameraSpeed;
		this.CameraZoomSteps = Hk.CameraZoomSensitivity * this.CameraZoomSteps;
	}

	Connect ()
	{
		let LPlr = game.GetService("Players").LocalPlayer;
		while ((LPlr.Character ?? LPlr.CharacterAdded.Wait()) === undefined) { wait(); }
		wait(3);
		this.InputChangedConnection = this.InputService.InputChanged.Connect((Inp, GameProc) => this.MouseScrollSet(Inp, GameProc))
		this.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
		this.CurrentCamera.CFrame = new CFrame(0, this.LevelsOfZoom[0].CameraDistance, 0);
		this.CurrentCamera.FieldOfView = 90;
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

	MoveCamera (MoveTo: Vector3)
	{
		this.DisableVelocity();
		let T = game.GetService("TweenService").Create(this.CurrentCamera, new TweenInfo(0.5, Enum.EasingStyle.Quad, Enum.EasingDirection.InOut, 0), { CFrame: new CFrame(new Vector3(MoveTo.X, this.CurrentCamera.CFrame.Position.Y, MoveTo.Z)).mul(this.CurrentCamera.CFrame.sub(this.CurrentCamera.CFrame.Position)) });
		T.Play();
		while (T.PlaybackState !== Enum.PlaybackState.Completed && T.PlaybackState !== Enum.PlaybackState.Cancelled && T.PlaybackState !== Enum.PlaybackState.Paused) { wait(); }
		this.EnableVelocity();
	}

	UpdateCamera (MoveTo: CFrame)
	{
		this.CurrentCamera.CameraSubject = undefined;

		this.CurrentCamera.CFrame = this.CurrentCamera.CFrame.Lerp(MoveTo, 0.2);
	}

	RenderStepped (DeltaTime: number)
	{
		if (this.CanHaveVelocity)
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
			this.RightRotationVelocity = (RightRotate && !LeftRotate ? 1 : !RightRotate && LeftRotate ? -1 : 0) * CameraSpeedFrame / 3;
			this.CameraYAngle += this.RightRotationVelocity;

			let Ray = new RaycastParams();
			let CollisionResult = CollisionCalculator.CalculateAhead(this.CurrentCamera.CFrame, this.MaxZoom * 4, Ray);
			let CurrentMin = CollisionResult.Result !== undefined ? CollisionResult.Result.Position.Y + this.MinZoom : this.MinZoom;
			let CurrentMax = CurrentMin + this.MaxZoom;
			if (this.CurrentCamera.CFrame.Y > CurrentMax)
			{
				this.InwardVelocity = -0.5;
			}
			else if (this.CurrentCamera.CFrame.Y < CurrentMin)
			{
				this.InwardVelocity = 0.5;
			}

			this.ImmediateInwardVelocity = this.InwardVelocity;

			let CameraZoomVisualTotal = this.InwardVelocity * this.CameraZoomSteps;// * (DeltaTime * 6.25);
			let CurrentLoZ: LevelOfZoom = this.LevelsOfZoom[0];
			let CurrentCF: CFrame = new CFrame(this.CurrentCamera.CFrame.Position).mul(CFrame.Angles(0, math.rad(-this.CameraYAngle), 0));
			let NewCF: CFrame = new CFrame((CurrentCF.LookVector.mul(this.ForwardVelocity).add(CurrentCF.RightVector.mul(this.RightVelocity)))).mul(CurrentCF).mul(CFrame.Angles(math.rad(-CurrentLoZ.CameraAngle), 0, 0)).mul(new CFrame(0, 0, CameraZoomVisualTotal));
			this.UpdateCamera(NewCF);
			if (this.InputService.IsKeyDown(Enum.KeyCode.U))
			{
				print(math.round(CurrentMin));
				print(math.round(CurrentMax));
				print(CollisionResult.Result?.Instance.GetFullName() ?? "");
			}
			this.InwardVelocity = this.InwardVelocity > -5 ? this.InwardVelocity - this.InwardVelocity * DeltaTime * 12.5 : 0;
			this.ImmediateInwardVelocity = 0;
		}
	}
}