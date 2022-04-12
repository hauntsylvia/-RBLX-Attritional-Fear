import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";

export class Processor
{
    Instance: RemoteFunction;
    constructor(Instance: RemoteFunction)
    {
        this.Instance = Instance;
    }

    MakeRequest<TReturn>(ServerRequest: ServerRequest<any>): ServerResponse<TReturn>
    {
        return this.Instance.InvokeServer(ServerRequest.ControllerRequested, ServerRequest.EndpointRequested, ServerRequest.Arguments);
    }
}