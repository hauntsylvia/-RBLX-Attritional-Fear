import { Species } from "../../../../consts/Enums";
import { IdGenerator } from "../../../util/IdGenerator";
import { Rate } from "../../../util/measurements/Rate";
import { EntityCondition } from "../conditions/EntityCondition";
import { IEntityPart } from "../interfaces/IEntityPart";
import { IId } from "./IId";

export class Entity implements IId
{
	constructor (Id: number | undefined, Parts: IEntityPart[], Name: string, SpeciesName: string | Species, EntityCondition: EntityCondition, EntitySightRadius: Rate, Origin: CFrame)
	{
		this.Id = Id ?? IdGenerator.GenerateId();
		this.Parts = Parts;
		this.EntityName = Name;
		this.EntitySpecies = typeOf(SpeciesName) === "string" ? SpeciesName as string : Species[SpeciesName as Species];
		this.EntityCondition = EntityCondition;
		this.EntitySightRadius = EntitySightRadius;
		this.Origin = Origin;
	}

    Id: number;

	Parts: IEntityPart[];

	EntityName: string;

	EntitySpecies: string;

	EntityCondition: EntityCondition;

	EntitySightRadius: Rate;

	Origin: CFrame;

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

	static GetPositionalAverageOfPartArray (Parts: BasePart[]): Vector3
	{
		let Sum = Vector3.zero;
		let Iterations = 0;
		Parts.forEach(VP =>
		{
			Sum = Sum.add(VP.Position);
			Iterations++;
		});
		Iterations = Iterations !== 0 ? Iterations : 1;
		Sum = Sum !== Vector3.zero ? Sum.div(Iterations) : Vector3.zero;
		let Avg = Sum.div(Iterations);
		return Avg;
	}
}