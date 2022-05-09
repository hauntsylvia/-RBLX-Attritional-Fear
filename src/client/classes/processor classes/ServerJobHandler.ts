import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../shared/consts/Enums";

export class ServerJobHandler<T>
{
	constructor (DoJob: (S: ServerJob<Partial<T>>) => any, DispatchJobType: ServerJobSpecifications)
	{
		this.DoJob = DoJob;
		this.DispatchJobType = DispatchJobType;
	}

	private DoJob: (S: ServerJob<Partial<T>>) => any

	DispatchJobType: ServerJobSpecifications;

	InvokeJob (S: ServerJob<Partial<T>>): void
	{
		this.DoJob(S);
	}
}