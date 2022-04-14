import { Hotkeys } from "./specifics/Hotkeys";
import { CameraHotkeys } from "./specifics/hotkeys/CameraHotkeys";

export class FoAPlayerSettings
{
	Hotkeys: Hotkeys;
	constructor (HKeys: Hotkeys | undefined)
	{
		this.Hotkeys = HKeys ?? new Hotkeys(undefined);
	}
}