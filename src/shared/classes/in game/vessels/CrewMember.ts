import { IId } from "../entities/implementations/IId";

export class CrewMember implements IId
{
	constructor (Id: number, FirstName: string, MiddleName?: string, LastName?: string)
	{
		this.Id = Id;
		this.FirstName = FirstName;
		this.MiddleName = MiddleName;
		this.LastName = LastName;
	}

    Id: number;

	FirstName: string;

	MiddleName?: string;

	LastName?: string;
}