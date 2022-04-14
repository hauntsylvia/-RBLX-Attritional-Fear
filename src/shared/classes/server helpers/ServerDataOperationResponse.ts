export class ServerDataOperationResponse
{
	DataOperationExecuted: boolean;
	RetryAt: DateTime;
	constructor (DataOperationSuccess: boolean, RetryAt: DateTime)
	{
		this.DataOperationExecuted = DataOperationSuccess;
		this.RetryAt = RetryAt;
	}
}