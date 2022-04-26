import { ChunkSettings } from "./specifics/ChunkSettings";
import { Hotkeys } from "./specifics/Hotkeys";
import { CameraHotkeys } from "./specifics/hotkeys/CameraHotkeys";

export class FoAPlayerSettings
{
	constructor (HotkeySettings?: Hotkeys | undefined, ChunkingSettings?: ChunkSettings)
	{
		this.Hotkeys = HotkeySettings ?? new Hotkeys();
		this.ChunkSettings = ChunkingSettings ?? new ChunkSettings();
	}

	Hotkeys: Hotkeys | undefined;

	ChunkSettings: ChunkSettings | undefined;
}