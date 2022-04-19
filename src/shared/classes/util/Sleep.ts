export class Sleep
{
	static RunService = game.GetService("RunService");
	static W (N: number = 0): number
	{
		let Dt = 0;
		while (Dt < N)
		{
			Dt = Dt + this.RunService.Heartbeat.Wait()[0];
		}
		return Dt;
	}
}