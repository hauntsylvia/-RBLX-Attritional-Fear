import { CameraHotkeys } from "./hotkeys/CameraHotkeys";

export class ChunkSettings
{
	constructor (ChunkDistancePerCycle: number = 200, SecondsPerCycle: number = 5)
	{
		this.ChunkDistancePerCycle = ChunkDistancePerCycle;
		this.SecondsPerCycle = SecondsPerCycle;
	}

	ChunkDistancePerCycle: number;

	SecondsPerCycle: number;
}