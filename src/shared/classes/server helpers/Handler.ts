import { Endpoint } from "./Endpoint";

export class Handler
{
    Name: string;
    Endpoints: Endpoint<any, any>[];
    constructor(Name: string, Endpoints: Endpoint<any, any>[])
    {
        this.Name = Name;
        this.Endpoints = Endpoints;
    }
}