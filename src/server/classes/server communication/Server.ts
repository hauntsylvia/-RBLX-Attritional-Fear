import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Rate } from "../../../shared/classes/util/measurements/Rate";
import { MetricUnits, TimeUnits } from "../../../shared/consts/Enums";
import { Strings } from "../../../shared/consts/Strings";
import { Replicator } from "../client communication/Replicator";
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

        this.APIListenerFunction = new Instance("RemoteFunction");
        this.APIListenerFunction.Name = "API";
        this.APIListenerFunction.OnServerInvoke = (Player: Player, Controller: unknown, Endpoint: unknown, Arg: unknown) =>
        {
            return this.OnAPIInvoke(Player, Controller, Endpoint, Arg);
        };
        this.APIListenerFunction.Parent = game.GetService("ReplicatedStorage");

        this.RegisterHandlers();

        let _APIReplicator = new Instance("RemoteEvent");
        _APIReplicator.Name = "APIReplicator";
        _APIReplicator.Parent = game.GetService("ReplicatedStorage");
        this.APIReplicator = new Replicator(_APIReplicator);
    }

    UnavailableHandlers: IHandler[] =
        [
            new PlayerDataHandler(),
            new PlayerHandler(),
            new TerrainHandler(),
        ];

    AvailableHandlers: IHandler[] = [];

    ServerData: ServerData;

    APIListenerFunction: RemoteFunction;

    APIReplicator: Replicator;

    AvailableListeners: Folder;

    OnAPIInvoke(Player: Player, ControllerRequested: unknown, EndpointRequested: unknown, Args: unknown)
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
                            Result = Endpoint.Invoke(Player, Request.Arguments, this.APIReplicator);
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