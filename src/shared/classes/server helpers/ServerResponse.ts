export class ServerResponse<T>
{
    Success: boolean;
    Returned: T | undefined;
    constructor(Success: boolean, Returned: T | undefined)
    {
        this.Success = Success;
        this.Returned = Returned;
    }
}