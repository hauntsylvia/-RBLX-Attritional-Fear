export class ServerDataSaveResponse
{
	RetryAt: DateTime | undefined;
	constructor (RetryAt: DateTime | undefined)
	{
		this.RetryAt = RetryAt;
	}
}