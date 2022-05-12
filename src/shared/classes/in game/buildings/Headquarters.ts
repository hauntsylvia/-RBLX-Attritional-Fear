import { IdGenerator } from "../../../../server/classes/modules/entities/IdGenerator";
import { BuildingTypes, BuildingVisuals } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { IId } from "../entities/Unique";
import { IBuilding } from "./interfaces/IBuilding";

export class Headquarters implements IBuilding, IId
{
	constructor (Id: number | undefined, ModelVisuals: BuildingVisuals)
	{
		this.Id = Id ?? IdGenerator.GenerateId();
		this.ModelVisuals = ModelVisuals;
	}

	Id: number;

	ModelVisuals: BuildingVisuals;

	BuildingType: BuildingTypes = BuildingTypes.HQ;
}