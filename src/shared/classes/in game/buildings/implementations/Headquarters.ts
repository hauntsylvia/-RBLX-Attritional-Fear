import { BuildingTypes, BuildingVisuals } from "../../../../consts/Enums";
import { IdGenerator } from "../../../util/IdGenerator";
import { IId } from "../../entities/implementations/IId";
import { IBuilding } from "../interfaces/IBuilding";

export class Headquarters implements IBuilding, IId
{
	constructor (Id: number | undefined, ModelVisuals: BuildingVisuals, Origin: CFrame)
	{
		this.Id = Id ?? IdGenerator.GenerateId();
		this.ModelVisuals = ModelVisuals;
		this.Origin = Origin;
	}

	Id: number;

	ModelVisuals: BuildingVisuals;

	BuildingType: BuildingTypes = BuildingTypes.HQ;

	Origin: CFrame;
}