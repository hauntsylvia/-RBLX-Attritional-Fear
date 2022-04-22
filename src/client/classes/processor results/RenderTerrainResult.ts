export class RenderTerrainResult
{
	constructor (Threads: thread[])
	{
		this.Threads = Threads;
	}

	Threads: thread[];
	Running: boolean = false;
	ThreadsKilled: boolean = false;

	Kill ()
	{
		this.Running = false;
		this.ThreadsKilled = true;
		this.Threads.forEach(VictimThread =>
		{
			coroutine.close(VictimThread);
		});
	}

	Run ()
	{
		this.Running = true;
		this.Threads.forEach(T =>
		{
			if (!this.ThreadsKilled && coroutine.status(T) !== "dead")
			{
				coroutine.resume(T);
			}
			else
			{
				this.Running = false;
			}
		});
	}

	WaitUntilDone ()
	{
		this.Running = true;
		this.Threads.forEach(T =>
		{
			while (coroutine.status(T) !== "dead")
			{
				if (this.ThreadsKilled)
				{
					this.Running = false;
					break;
				}
				game.GetService("RunService").Heartbeat.Wait();
			}
		});
	}

	Dead (): boolean
	{
		return this.Threads.every((T) => coroutine.status(T) === "dead");
	}
}