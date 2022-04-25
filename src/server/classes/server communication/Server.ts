import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";
import { Handler } from "../handlers/Handler";
import { ServerData } from "./ServerData";

export class Server
{
    static Main()
    {
        Server.ServerData = new ServerData();

        Server.APIListener = new Instance("RemoteFunction");
        Server.APIListener.Name = "API";
        Server.APIListener.OnServerInvoke = this.OnInvoke;
        Server.APIListener.Parent = game.GetService("ReplicatedStorage");

        Server.AvailableListeners = new Instance("Folder");
        Server.AvailableListeners.Name = Strings.AvailableServicesFolderName;
        Server.AvailableListeners.Parent = game.GetService("ReplicatedStorage");
        print("B");
        this.RegisterHandlers();
    }

    static ServerData: ServerData;

    static APIListener: RemoteFunction;

    static AvailableListeners: Folder;

    static OnInvoke(this: Player, ControllerRequested: unknown, EndpointRequested: unknown, Args: unknown)
    {
        if(typeIs(ControllerRequested, "string") && typeIs(EndpointRequested, "string"))
        {
            const Request = new ServerRequest<any>(ControllerRequested as string, EndpointRequested as string, Args);
            let Result: ServerResponse<any> | undefined;
            Handler.Implementations.forEach(Handler =>
            {
                if(Handler.Name === Request.ControllerRequested)
                {
                    Handler.Endpoints.forEach(Endpoint =>
                    {
                        if(Endpoint.Route === Request.EndpointRequested)
                        {
                            Result = Endpoint.Invoke(this, Request.Arguments);
                        }
                    });
                }
            });
            return Result === undefined ? new ServerResponse<string>(false, "404") : Result;
        }
        else
        {
            return new ServerResponse<string>(false, "Client sent invalid data.");
        }
    }

    static RegisterHandlers()
    {
        Handler.Implementations.forEach(Handler =>
        {
            Handler.ServerRegistering(Server.ServerData);
            coroutine.resume(coroutine.create(() =>
            {
                let Expose = new Instance("BoolValue");
                Expose.Name = Handler.Name;
                Expose.Value = true;
                Expose.Parent = this.AvailableListeners;
            }));
        });
    }
}