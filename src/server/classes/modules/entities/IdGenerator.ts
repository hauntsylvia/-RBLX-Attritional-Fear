export class IdGenerator
{
	static LastGeneratedId: number = 0;
	static GenerateId (): number
	{
		let Candidate = tick();
		if (this.LastGeneratedId === Candidate)
		{
			wait(1);
			return this.GenerateId();
		}
		else
		{
			this.LastGeneratedId = Candidate;
			return Candidate;
		}
	}
}