import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";

export class Processor
{
    Instance: RemoteFunction;
    constructor(Instance: RemoteFunction)
    {
        this.Instance = Instance;
    }

    ServiceAvailable (ControllerName: string): boolean
    {
        let Folder = game.GetService("ReplicatedStorage").FindFirstChild(Strings.AvailableServicesFolderName);
        let Exposer = Folder?.FindFirstChild(ControllerName);
        return Folder !== undefined && Exposer !== undefined && Exposer.IsA("BoolValue") && Exposer.Value;
	}

    MakeRequest<TReturn>(ServerRequest: ServerRequest<any>): ServerResponse<TReturn>
    {
        if (!this.ServiceAvailable(ServerRequest.ControllerRequested))
        {
            wait(3);
            this.MakeRequest(ServerRequest);
		}
        return this.Instance.InvokeServer(ServerRequest.ControllerRequested, ServerRequest.EndpointRequested, ServerRequest.Arguments);
    }
}