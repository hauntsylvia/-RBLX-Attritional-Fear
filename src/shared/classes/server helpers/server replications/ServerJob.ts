import { ServerJobSpecifications } from "../../../consts/Enums";

export class ServerJob<T>
{
    constructor (ServerJobSpecification: ServerJobSpecifications, Returned?: T)
    {
        this.ServerJobSpecification = ServerJobSpecification;
        this.Returned = Returned;
    }

    ServerJobSpecification: ServerJobSpecifications;

    Returned?: T;
}