import { Headquarters } from "../../../classes/in game/buildings/Headquarters";
import { IBuilding } from "../../../classes/in game/buildings/interfaces/IBuilding";
import { SelfFoAFaction } from "../../../classes/in game/factions/SelfFoAFaction";

export class StuffOnRoundStart
{
	constructor (SelfF: SelfFoAFaction)
	{
		this.StartingBuildings =
			[
				new Headquarters(undefined, SelfF)
			];
	}

	StartingBuildings: IBuilding[];
}