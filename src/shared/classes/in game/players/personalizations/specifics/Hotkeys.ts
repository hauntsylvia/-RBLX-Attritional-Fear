import { Camera } from "../../../../../../client/classes/camera/Camera";
import { CameraHotkeys } from "./hotkeys/CameraHotkeys";

export class Hotkeys
{
	CameraHotkeys: CameraHotkeys;
	constructor (CameraHkeys: CameraHotkeys | undefined)
	{
		this.CameraHotkeys = CameraHkeys ?? new CameraHotkeys(Enum.UserInputType.MouseWheel, Enum.UserInputType.MouseWheel, Enum.KeyCode.Plus, Enum.KeyCode.Minus, Enum.KeyCode.W, Enum.KeyCode.S, Enum.KeyCode.A, Enum.KeyCode.D);
	}
}