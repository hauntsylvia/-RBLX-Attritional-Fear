import { Endpoint } from "../server communication/Endpoint";

export interface IHandler
{
    Name: string;
    Endpoints: Endpoint<any, any>[];
}

export namespace IHandler
{
    type Constructor<T> =
        {
            new(...args: any[]): T;
            readonly prototype: T;
        };
    const Implementations: Constructor<IHandler>[] = [];
    export function GetImplementations (): Constructor<IHandler>[]
    {
        return Implementations;
    }
    export function Register<T extends Constructor<IHandler>> (ctor: T)
    {
        Implementations.push(ctor);
        return ctor;
    }
}