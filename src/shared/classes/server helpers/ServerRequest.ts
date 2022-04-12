export class ServerRequest<T>
{
	ControllerRequested: string;
	EndpointRequested: string;
	Arguments: T;
	constructor(ControllerRequested: string, EndpointRequested: string, Arguments: T)
	{
		this.ControllerRequested = ControllerRequested;
		this.EndpointRequested = EndpointRequested;
		this.Arguments = Arguments;
	}
}