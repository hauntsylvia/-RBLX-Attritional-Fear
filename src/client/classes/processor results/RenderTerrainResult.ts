import { Sleep } from "../../../shared/classes/util/Sleep";
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
		while (!this.Dead())
		{
			wait();
		}
	}

	Dead (): boolean
	{
		return this.Threads.every((T) => coroutine.status(T) === "dead");
	}
}