import { CameraHotkeys } from "./hotkeys/CameraHotkeys";

export class Hotkeys
{
	CameraHotkeys: CameraHotkeys;
	constructor (CameraHkeys?: CameraHotkeys)
	{
		this.CameraHotkeys = CameraHkeys ?? new CameraHotkeys(Enum.UserInputType.MouseWheel.Name, Enum.UserInputType.MouseWheel.Name, Enum.KeyCode.Plus.Name, Enum.KeyCode.Minus.Name, Enum.KeyCode.W.Name, Enum.KeyCode.S.Name, Enum.KeyCode.A.Name, Enum.KeyCode.D.Name, Enum.KeyCode.Q.Name, Enum.KeyCode.E.Name, 0.5, 0.5);
	}
}