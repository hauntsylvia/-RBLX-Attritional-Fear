import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";
import { Replicator } from "../client communication/Replicator";


export class Endpoint<ExpectedArgFromClient, ExpectedReturnToClient>
{
    constructor (Route: string, OnRoutedTo: (Player: Player, Arg: ExpectedArgFromClient, Replicator: Replicator) => ExpectedReturnToClient | undefined)
    {
        this.Route = Route;
        this.OnRoutedTo = OnRoutedTo;
    }

    Route: string;

    OnRoutedTo: (Player: Player, Arg: ExpectedArgFromClient, Replicator: Replicator) => ExpectedReturnToClient | undefined;

    Invoke (Player: Player, Arg: ExpectedArgFromClient, Replicator: Replicator): ServerResponse<ExpectedReturnToClient>
    {
        let Result = this.OnRoutedTo(Player, Arg, Replicator);
        return new ServerResponse<ExpectedReturnToClient>(Result !== undefined, Result);
    }
}