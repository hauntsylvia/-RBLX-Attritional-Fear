import { Strings } from "../../../../shared/consts/Strings";
import { Endpoint } from "../../server communication/Endpoint";
import { ServerData } from "../../server communication/ServerData";
import { IHandler } from "../Handler";

export class EntitiesHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.EntityStrings.EntityHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
        [
        ];

    ServerData!: ServerData;

    ServerRegistering (ServerData: ServerData)
    {
        this.ServerData = ServerData;
    }
}