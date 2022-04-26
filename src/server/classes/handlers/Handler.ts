import { Endpoint } from "../server communication/Endpoint";
import { ServerData } from "../server communication/ServerData";
import { PlayerDataHandler } from "./PlayerDataHandler";

export interface IHandler
{
    Name: string;

    Endpoints: Endpoint<any, any>[];

    ServerRegistering (ServerData: ServerData): any;
}