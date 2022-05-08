export class ServerResponse<T>
{
    constructor(Success: boolean, Returned?: T)
    {
        this.Success = Success;
        this.Returned = Returned;
    }

    Success: boolean;

    Returned?: T;
}