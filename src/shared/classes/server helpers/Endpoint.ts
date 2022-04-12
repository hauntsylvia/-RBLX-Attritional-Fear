import { ServerResponse } from "./ServerResponse";

export class Endpoint<ExpectedArg, ReturnOnSuccess>
{
    constructor(Route: string, OnRoutedTo: (Player: Player, Arg: ExpectedArg) => ReturnOnSuccess)
    {
        this.Route = Route;
        this.OnRoutedTo = OnRoutedTo;
    }

    Route: string;

    OnRoutedTo: (Player: Player, Arg: ExpectedArg) => ReturnOnSuccess;

    Invoke(Player: Player, Arg: ExpectedArg): ServerResponse<ReturnOnSuccess>
    {
        let Result = this.OnRoutedTo(Player, Arg);
        return new ServerResponse<ReturnOnSuccess>(Result !== undefined, Result);
    }
}