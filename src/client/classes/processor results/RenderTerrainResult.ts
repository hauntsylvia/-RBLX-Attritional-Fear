import { Workers } from "../../../shared/classes/util/Workers";

export class RenderTerrainResult
{
	constructor (Threads: thread[])
	{
		this.Threads = Threads;
	}

	Threads: thread[];
	ThreadsKilled: boolean = false;

	Kill ()
	{
		this.ThreadsKilled = true;
	}

	WaitUntilDone ()
	{
		new Workers(this.Threads).Split(1);
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