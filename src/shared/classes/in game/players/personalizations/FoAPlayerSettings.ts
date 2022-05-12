import { BuildingVisualsSettings } from "./specifics/BuildingVisualsSettings";
import { ChunkSettings } from "./specifics/ChunkSettings";
import { Hotkeys } from "./specifics/Hotkeys";
import { CameraHotkeys } from "./specifics/hotkeys/CameraHotkeys";

export class FoAPlayerSettings
{
	constructor (HotkeySettings?: Hotkeys, ChunkingSettings?: ChunkSettings, BuildingVisSettings?: BuildingVisualsSettings)
	{
		this.Hotkeys = HotkeySettings ?? new Hotkeys();
		this.ChunkSettings = ChunkingSettings ?? new ChunkSettings();
		this.BuildingVisualsSettings = BuildingVisSettings ?? new BuildingVisualsSettings(new Map());
	}

	// all of these are nullable because there is zero promise that the roblox datastore will return these properties as non-nulls. never allow
	// them to be non-null.

	Hotkeys?: Hotkeys;

	ChunkSettings?: ChunkSettings;

	BuildingVisualsSettings?: BuildingVisualsSettings;
}