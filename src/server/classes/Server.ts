import { Handler } from "shared/classes/server helpers/Handler";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerData } from "./ServerData";

export class Server
{
    static ServerData: ServerData;

    static APIListener: RemoteFunction;

    static Handlers: Handler[] = new Array<Handler>();

    static Main()
    {
        Server.ServerData = new ServerData();
        Server.APIListener = new Instance("RemoteFunction", game.GetService("ReplicatedStorage"));
        Server.APIListener.Name = "API";
        Server.APIListener.OnServerInvoke = this.OnInvoke;
    }

    static OnInvoke(this: Player, ControllerRequested: unknown, EndpointRequested: unknown, Args: unknown)
    {
        if(typeIs(ControllerRequested, "string") && typeIs(EndpointRequested, "string"))
        {
            const Request = new ServerRequest<any>(ControllerRequested as string, EndpointRequested as string, Args);
            let Result;
            Server.Handlers.forEach(Handler =>
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
            return Result;
        }
    }

    static RegisterHandler(Handler: Handler)
    {
        Server.Handlers.push(Handler);
    }
}