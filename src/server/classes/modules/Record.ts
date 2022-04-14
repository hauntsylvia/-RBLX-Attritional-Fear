export class Record<T>
{
	Success: boolean;
	Value: T | undefined;
	constructor (Success: boolean, Value: T | undefined)
	{
		this.Success = Success;
		this.Value = Value;
	}
}