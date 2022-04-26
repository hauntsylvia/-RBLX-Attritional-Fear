import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";
import { IHandler } from "../handlers/Handler";
import { PlayerDataHandler } from "../handlers/PlayerDataHandler";
import { PlayerHandler } from "../handlers/PlayerHandler";
import { TerrainHandler } from "../handlers/TerrainHandler";
import { ServerData } from "./ServerData";

export class Server
{
    constructor()
    {
        this.ServerData = new ServerData();

        this.AvailableListeners = new Instance("Folder");
        this.AvailableListeners.Name = Strings.AvailableServicesFolderName;
        this.AvailableListeners.Parent = game.GetService("ReplicatedStorage");

        this.APIListener = new Instance("RemoteFunction");
        this.APIListener.Name = "API";
        this.APIListener.OnServerInvoke = (Player: Player, Controller: unknown, Endpoint: unknown, Arg: unknown) =>
        {
            return this.OnInvoke(Player, Controller, Endpoint, Arg);
        };
        this.APIListener.Parent = game.GetService("ReplicatedStorage");

        this.RegisterHandlers();
    }

    UnavailableHandlers: IHandler[] =
        [
            new PlayerDataHandler(),
            new PlayerHandler(),
            new TerrainHandler(),
        ];
    AvailableHandlers: IHandler[] = [];

    ServerData: ServerData;

    APIListener: RemoteFunction;

    AvailableListeners: Folder;

    OnInvoke(Player: Player, ControllerRequested: unknown, EndpointRequested: unknown, Args: unknown)
    {
        if(typeIs(ControllerRequested, "string") && typeIs(EndpointRequested, "string"))
        {
            const Request = new ServerRequest<any>(ControllerRequested as string, EndpointRequested as string, Args);
            let Result: ServerResponse<any> | undefined;
            this.AvailableHandlers.forEach(Handler =>
            {
                if(Handler.Name === Request.ControllerRequested)
                {
                    Handler.Endpoints.forEach(Endpoint =>
                    {
                        if(Endpoint.Route === Request.EndpointRequested)
                        {
                            Result = Endpoint.Invoke(Player, Request.Arguments);
                        }
                    });
                }
            });
            Result = Result ?? new ServerResponse<string>(false, "404");
            return Result;
        }
        else
        {
            return new ServerResponse<string>(false, "Client sent invalid data.");
        }
    }

    RegisterHandlers()
    {
        this.UnavailableHandlers.forEach(Handler =>
        {
            coroutine.resume(coroutine.create(() =>
            {
                print(Handler.Name + " is initializing . .");
                Handler.ServerRegistering(this.ServerData);
                print(Handler.Name + " has initialized.");
                this.AvailableHandlers.push(Handler);
                let Expose = new Instance("BoolValue");
                Expose.Name = Handler.Name;
                Expose.Value = true;
                Expose.Parent = this.AvailableListeners;
            }));
        });
    }
}