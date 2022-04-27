export class CrewMember
{
	constructor (FirstName: string, MiddleName?: string, LastName?: string)
	{
		this.FirstName = FirstName;
		this.MiddleName = MiddleName;
		this.LastName = LastName;
	}

	FirstName: string;

	MiddleName?: string;

	LastName?: string;
}