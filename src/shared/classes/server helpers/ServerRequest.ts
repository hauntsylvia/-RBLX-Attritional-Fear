export class ServerRequest<T>
{
	constructor(ControllerRequested: string, EndpointRequested: string, Arguments: T)
	{
		this.ControllerRequested = ControllerRequested;
		this.EndpointRequested = EndpointRequested;
		this.Arguments = Arguments;
	}

	ControllerRequested: string;

	EndpointRequested: string;

	Arguments: T;
}