import { Sleep } from "./Sleep";

export class Workers
{
	constructor (Threads: thread[])
	{
		this.Threads = Threads;
	}

	Threads: thread[];

	Split (WorkerMax: number, Stepper?: Sleep)
	{
		let Alive = 0;
		for (let A = 0; A < this.Threads.size(); A++)
		{
			coroutine.resume(this.Threads[A]);
			Alive++;
			coroutine.resume(coroutine.create(() =>
			{
				while (coroutine.status(this.Threads[A]) !== "dead") { wait(); }
				Alive--;
			}));
			while (Alive > WorkerMax) { Stepper !== undefined ? Stepper.Step() : wait(); }
			Stepper !== undefined ? Stepper.Step() : wait();
		}
	}
}