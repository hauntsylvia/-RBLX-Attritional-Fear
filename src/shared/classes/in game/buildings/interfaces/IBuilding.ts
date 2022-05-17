import { BuildingTypes, BuildingVisuals } from "../../../../consts/Enums";
import { IId } from "../../entities/implementations/IId";

export interface IBuilding extends IId
{
	ModelVisuals: BuildingVisuals;
	BuildingType: BuildingTypes;
	Origin: CFrame;
}