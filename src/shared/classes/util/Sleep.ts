export class Sleep
{

	constructor (MaxStep: number = 5000)
	{
		this.MaxStep = MaxStep;
	}

	CurrentStep: number = 0;
	MaxStep: number;

	Step ()
	{
		if (this.CurrentStep > this.MaxStep)
		{
			this.CurrentStep = 0;
			Sleep.RunService.Heartbeat.Wait();
		}
		this.CurrentStep++;
	}

	static RunService = game.GetService("RunService");
	static W (N: number = 0): number
	{
		let Dt = 0;
		while (Dt < N)
		{
			Dt = Dt + Sleep.RunService.Heartbeat.Wait()[0];
		}
		return Dt;
	}
}