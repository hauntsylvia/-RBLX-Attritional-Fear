import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";

export class Replicator
{
	constructor (APIReplicator: RemoteEvent)
	{
		this.APIReplicator = APIReplicator;
	}

	APIReplicator: RemoteEvent;

	SendToClient<T> (Clients: Player[], Job: ServerJob<T>)
	{
		Clients.forEach(C =>
		{
			this.APIReplicator.FireClient(C, Job);
		});
	}
}