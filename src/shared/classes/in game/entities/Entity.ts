import { Species } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { EntityCondition } from "./conditions/EntityCondition";
import { IEntityPart } from "./IEntityPart";
import { IId } from "./Unique";

export class Entity implements IId
{
	constructor (Id: number, Parts: IEntityPart[], Name: string, SpeciesName: string | Species, EntityCondition: EntityCondition)
	{
		this.Id = Id;
		this.Parts = Parts;
		this.EntityName = Name;
		this.EntitySpecies = typeOf(SpeciesName) === "string" ? SpeciesName as string : Species[SpeciesName as Species];
		this.EntityCondition = EntityCondition;
	}

    Id: number;

	Parts: IEntityPart[];

	EntityName: string;

	EntitySpecies: string;

	EntityCondition: EntityCondition;
}