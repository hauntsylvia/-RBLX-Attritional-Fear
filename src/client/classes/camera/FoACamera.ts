import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { CameraHotkeys } from "../../../shared/classes/in game/players/personalizations/specifics/hotkeys/CameraHotkeys";
import { SelfFoAPlayer } from "../../../shared/classes/in game/players/SelfFoAPlayer";
import { EnumParser } from "../../../shared/classes/util/EnumParser";
import { LevelOfZoom } from "./LevelOfZoom";

export class FoACamera
{
	static ThisRenderStepLabel: string = "CameraOperation";

	constructor (CurrentLoZ: LevelOfZoom, Settings: FoAPlayerSettings, LocalCamera?: Camera | undefined)
	{
		this.LevelsOfZoom = [CurrentLoZ];
		this.LoadNewSettings(Settings);
		this.CurrentCamera = LocalCamera ?? game.GetService("Workspace").CurrentCamera ?? error("No valid camera found.");
		this.InputService = game.GetService("UserInputService");
		this.CameraEndGoalPosition = this.CurrentCamera.CFrame;
	}

	LevelsOfZoom: LevelOfZoom[];

	CurrentCamera: Camera;

	InputChangedConnection: RBXScriptConnection | undefined;

	InputService: UserInputService;

	MoveForward!: Enum.KeyCode;
	MoveBackward!: Enum.KeyCode;
	MoveLeft!: Enum.KeyCode;
	MoveRight!: Enum.KeyCode;

	ForwardVelocity: number = 0;
	RightVelocity: number = 0;
	InwardVelocity: number = 0;
	CameraSpeed: number = 1000;
	CameraSensitivity: number = 50;

	CameraEndGoalPosition: CFrame;

	LoadNewSettings (Settings: FoAPlayerSettings)
	{
		let Hk: CameraHotkeys = Settings.Hotkeys.CameraHotkeys;
		let ForwardEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveForward);
		let BackwardEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveBackward);
		let LeftEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveLeft);
		let RightEnum = EnumParser.GetEnumFromString<Enum.KeyCode>(Hk.MoveRight);
		if (ForwardEnum !== undefined && BackwardEnum !== undefined && LeftEnum !== undefined && RightEnum !== undefined)
		{
			this.MoveForward = ForwardEnum;
			this.MoveBackward = BackwardEnum;
			this.MoveLeft = LeftEnum;
			this.MoveRight = RightEnum;
		}
		this.CameraSpeed = Hk.CameraSpeed * this.CameraSpeed;
		this.CameraSensitivity = Hk.CameraSensitivity * this.CameraSensitivity;
	}

	Connect ()
	{
		this.InputChangedConnection = this.InputService.InputChanged.Connect((Inp, GameProc) => this.MouseScrollSet(Inp, GameProc))
		this.CurrentCamera.CameraType = Enum.CameraType.Scriptable;
		this.CurrentCamera.CFrame = new CFrame(0, this.LevelsOfZoom[0].CameraDistance, 0);
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
			print(InputObject.UserInputState);
			this.InwardVelocity = (InputObject.UserInputState === Enum.UserInputState.Change ? (InputObject.Position.Z > 0 ? -this.CameraSensitivity : InputObject.Position.Z < 0 ? this.CameraSensitivity : 0) : (0));
		}
	}

	RenderStepped (DeltaTime: number)
	{
		let ForwardMove: boolean = this.InputService.IsKeyDown(this.MoveForward);
		let BackwardMove: boolean = this.InputService.IsKeyDown(this.MoveBackward);
		let RightMove: boolean = this.InputService.IsKeyDown(this.MoveRight);
		let LeftMove: boolean = this.InputService.IsKeyDown(this.MoveLeft);
		this.ForwardVelocity = ForwardMove && !BackwardMove ? 1 : !ForwardMove && BackwardMove ? -1 : 0;
		this.RightVelocity = RightMove && !LeftMove ? 1 : !RightMove && LeftMove ? -1 : 0;
		let CurrentLoZ: LevelOfZoom = this.LevelsOfZoom[0];
		let CurrentCF: CFrame = new CFrame(this.CurrentCamera.CFrame.Position);
		let NewCF: CFrame = new CFrame((CurrentCF.LookVector.mul(this.ForwardVelocity).add(CurrentCF.RightVector.mul(this.RightVelocity))).mul(this.CameraSpeed * DeltaTime)).mul(CurrentCF).mul(CFrame.Angles(math.rad(-CurrentLoZ.CameraAngle), 0, 0));
		this.CameraEndGoalPosition = NewCF.add(new Vector3(0, this.InwardVelocity, this.InwardVelocity));
		this.CurrentCamera.CFrame = this.CurrentCamera.CFrame.Lerp(this.CameraEndGoalPosition, 0.05);
		this.InwardVelocity = this.InwardVelocity + (0 - this.InwardVelocity) * 0.09;
		//this.InwardVelocity = 0;
	}
}