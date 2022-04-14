import { ServerDataSaveResponse } from "../../../shared/classes/server helpers/ServerDataSaveResponse";
import { ServerData } from "../server communication/ServerData";
import { Record } from "./Record";

export class Register
{
	RecentGetTransactions: Map<number, DateTime> = new Map<number, DateTime>();
	RecentSaveTransactions: Map<number, DateTime> = new Map<number, DateTime>();

	constructor (StoreName: string, AppendedKey: string, MinimumTimePerRequest: number)
	{
		this.Store = game.GetService("DataStoreService").GetDataStore(StoreName);
		this.AppendedKey = AppendedKey;
		this.MinimumTimePerRequest = MinimumTimePerRequest;
		print("Register of name " + StoreName + " initialized with an mtpr of " + MinimumTimePerRequest + ".");
	}

	Store: GlobalDataStore;

	AppendedKey: string;

	MinimumTimePerRequest: number;

	Key (UserId: number): string
	{
		return UserId + this.AppendedKey;
	}

	GetRecord<T> (UserId: number): Record<T>
	{
		if (this.RecentGetTransactions.has(UserId) && (this.RecentGetTransactions.get(UserId) as DateTime).UnixTimestamp > DateTime.now().UnixTimestamp)
		{
			let RetryAt: DateTime = this.RecentGetTransactions.get(UserId) as DateTime;
			print("Get request denied.");
			return new Record<T>(false, new ServerDataSaveResponse(false, RetryAt), undefined);
		}
		else
		{
			this.RecentGetTransactions.set(UserId, DateTime.fromUnixTimestamp(os.time() + this.MinimumTimePerRequest));
			let NextOpAt: DateTime = this.RecentGetTransactions.get(UserId) as DateTime;
			let Value: T | undefined = this.Store.GetAsync<T>(this.Key(UserId));
			print("Record get.");
			return new Record<T>(Value !== undefined, new ServerDataSaveResponse(true, NextOpAt), Value);
		}
	}

	SaveRecord<T> (UserId: number, Value: T): ServerDataSaveResponse
	{
		if (this.RecentSaveTransactions.has(UserId) && (this.RecentSaveTransactions.get(UserId) as DateTime).UnixTimestamp > DateTime.now().UnixTimestamp)
		{
			let RetryAt: DateTime = this.RecentSaveTransactions.get(UserId) as DateTime;
			print("Save request denied.");
			return new ServerDataSaveResponse(false, RetryAt);
		}
		else
		{
			this.RecentSaveTransactions.set(UserId, DateTime.fromUnixTimestamp(os.time() + this.MinimumTimePerRequest));
			let NextOpAt: DateTime = this.RecentSaveTransactions.get(UserId) as DateTime;
			this.Store.SetAsync(this.Key(UserId), Value);
			print("Record set.");
			return new ServerDataSaveResponse(true, NextOpAt);
		}
	}
}