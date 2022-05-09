import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";

export class ServerJobDispatcher<T>
{
	constructor (DoJob: (S: ServerJob<Partial<T>>) => any)
	{
		this.DoJob = DoJob;
	}

	private DoJob: (S: ServerJob<Partial<T>>) => any

	InvokeJob (S: ServerJob<Partial<T>>): void
	{
		this.DoJob(S);
	}
}