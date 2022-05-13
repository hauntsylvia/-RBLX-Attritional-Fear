import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { Server } from "../../../server/classes/server communication/Server";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { ServerJobHandler } from "../processor classes/server job handlers/ServerJobHandler";
import { InterfacingObjectsProcessor } from "./InterfacingObjectsProcessor";
import { Processor } from "./Processor";

export class ServerJobProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction, APIReplicator: RemoteEvent)
    {
        super(APIInstance);
        this.ListenTo = APIReplicator;
    }

    private ServerJobHandlers: ServerJobHandler<any>[] = [];

    ListenTo: RemoteEvent;

    Signal?: RBXScriptConnection;

    RegisterHandler (ServerJobHandler: ServerJobHandler<any>)
    {
        this.ServerJobHandlers.push(ServerJobHandler);
	}

    StopDispatching (): void
    {
        this.Signal?.Disconnect();
    }

    StartDispatching(): void
    {
        if (this.Signal !== undefined && !this.Signal.Connected)
        {
            this.Signal = this.ListenTo.OnClientEvent.ConnectParallel((Arg: unknown) => this.OnServerDispatching(Arg));
		}
    }

    private OnServerDispatching (Arg: unknown)
    {
        let Attempt = opcall(() =>
        {
            let AArg = Arg as ServerJob<any>;
            this.ServerJobHandlers.forEach(H =>
            {
                if (H.DispatchJobType === AArg.ServerJobSpecification)
                {
                    H.InvokeJob(AArg);
				}
            });
        });
        if (!Attempt.success)
        {
            print("Server dispatched incompatible argument!");
		}
	}
}