import { ServerResponse } from "shared/classes/server helpers/ServerResponse";


export class Endpoint<ExpectedArg, ReturnOnSuccess>
{
    constructor (Route: string, OnRoutedTo: (Player: Player, Arg: ExpectedArg) => ReturnOnSuccess | undefined)
    {
        this.Route = Route;
        this.OnRoutedTo = OnRoutedTo;
    }

    Route: string;

    OnRoutedTo: (Player: Player, Arg: ExpectedArg) => ReturnOnSuccess | undefined;

    Invoke(Player: Player, Arg: ExpectedArg): ServerResponse<ReturnOnSuccess>
    {
        let Result = this.OnRoutedTo(Player, Arg);
        return new ServerResponse<ReturnOnSuccess>(Result !== undefined, Result);
    }
}