import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";

export class Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        this.APIInstance = APIInstance;
    }

    APIInstance: RemoteFunction;

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
            return this.MakeRequest(ServerRequest);
        }
        else
        {
            return this.APIInstance.InvokeServer(ServerRequest.ControllerRequested, ServerRequest.EndpointRequested, ServerRequest.Arguments);
		}
    }
}