import { Species } from "../../../consts/Enums";
import { IEntityPart } from "./IEntityPart";

export class Entity
{
	constructor (Parts: IEntityPart[], Name: string, SpeciesName: string | Species)
	{
		this.Parts = Parts;
		this.EntityName = Name;
		this.EntitySpecies = typeOf(SpeciesName) === "string" ? SpeciesName as string : Species[SpeciesName as Species];
	}

	Parts: IEntityPart[];

	EntityName: string;

	EntitySpecies: string;
}