import { Species } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { EntityCondition } from "./conditions/EntityCondition";
import { IEntityPart } from "./IEntityPart";
import { IId } from "./Unique";

export class Entity implements IId
{
	constructor (Id: number, Parts: IEntityPart[], Name: string, SpeciesName: string | Species, EntityCondition: EntityCondition, EntitySightRadius: number)
	{
		this.Id = Id;
		this.Parts = Parts;
		this.EntityName = Name;
		this.EntitySpecies = typeOf(SpeciesName) === "string" ? SpeciesName as string : Species[SpeciesName as Species];
		this.EntityCondition = EntityCondition;
		this.EntitySightRadius = EntitySightRadius;
	}

    Id: number;

	Parts: IEntityPart[];

	EntityName: string;

	EntitySpecies: string;

	EntityCondition: EntityCondition;

	EntitySightRadius: number;

	static GetPositionalAverage (V: Entity): Vector3
	{
		let Sum = Vector3.zero;
		let Iterations = 0;
		V.Parts.forEach(VP =>
		{
			Sum = Sum.add(VP.ModelCenter);
			Iterations++;
		});
		Iterations = Iterations !== 0 ? Iterations : 1;
		Sum = Sum !== Vector3.zero ? Sum.div(Iterations) : Vector3.zero;
		let Avg = Sum.div(Iterations);
		return Avg;
	}
}