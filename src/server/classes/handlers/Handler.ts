import { Endpoint } from "../server communication/Endpoint";
import { ServerData } from "../server communication/ServerData";

export class Handler
{
    static Implementations: Set<Handler> = new Set();

    constructor (Name: string, Endpoints: Endpoint<any, any>[])
    {
        this.Name = Name;
        this.Endpoints = Endpoints;
    }

    ServerRegistering (Data: ServerData)
    {
        print(this.Name + " was registered as an API controller!");
	}

    Name: string;

    Endpoints: Endpoint<any, any>[];
}