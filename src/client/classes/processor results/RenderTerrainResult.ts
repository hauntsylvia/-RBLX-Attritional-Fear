import { Sleep } from "../../../shared/classes/util/Sleep";
import { Workers } from "../../../shared/classes/util/Workers";

export class RenderTerrainResult
{
	constructor (Threads: thread[], S: Sleep)
	{
		this.Threads = Threads;
		this.S = S;
	}

	Threads: thread[];
	S: Sleep;
	ThreadsKilled: boolean = false;

	Kill ()
	{
		this.ThreadsKilled = true;
	}

	WaitUntilDone ()
	{
		new Workers(this.Threads).Split(1, this.S);
	}

	Run ()
	{
		coroutine.resume(coroutine.create(() =>
		{
			this.WaitUntilDone();
		}));
	}

	Dead (): boolean
	{
		return this.Threads.every((T) => coroutine.status(T) === "dead");
	}
}