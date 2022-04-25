import { Endpoint } from "./Endpoint";

export interface IHandler
{
    Name: string;
    Endpoints: Endpoint<any, any>[];
}