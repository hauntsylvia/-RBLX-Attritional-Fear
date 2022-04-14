import { ServerDataSaveResponse } from "../../../shared/classes/server helpers/ServerDataSaveResponse";

export class Record<T>
{
	Success: boolean;
	DataResponse: ServerDataSaveResponse;
	Value: T | undefined;
	constructor (Success: boolean, DataResponse: ServerDataSaveResponse, Value: T | undefined)
	{
		this.Success = Success;
		this.DataResponse = DataResponse;
		this.Value = Value;
	}
}