import { Record } from "./Record";

export class Register
{
	constructor (StoreName: string, AppendedKey: string)
	{
		this.Store = game.GetService("DataStoreService").GetDataStore(StoreName);
		this.AppendedKey = AppendedKey;
	}

	Store: GlobalDataStore;

	AppendedKey: string;

	Key (UserId: number): string
	{
		return UserId + this.AppendedKey;
	}

	GetRecord<T> (UserId: number): Record<T>
	{
		let Value: Record<T> | undefined = this.Store.GetAsync<Record<T>>(this.Key(UserId));
		return Value ?? new Record<T>(false, undefined);
	}

	SaveRecord<T> (UserId: number, Value: Record<T>)
	{
		this.Store.SetAsync(this.Key(UserId), Value);
	}
}