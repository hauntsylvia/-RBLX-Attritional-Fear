import { Headquarters } from "../../../classes/in game/buildings/Headquarters";
import { IBuilding } from "../../../classes/in game/buildings/interfaces/IBuilding";
import { Entity } from "../../../classes/in game/entities/Entity";
import { SelfFoAFaction } from "../../../classes/in game/factions/SelfFoAFaction";
import { BuildingVisualsSettings } from "../../../classes/in game/players/personalizations/specifics/BuildingVisualsSettings";
import { SelfFoAPlayer } from "../../../classes/in game/players/SelfFoAPlayer";
import { CrewMember } from "../../../classes/in game/vessels/CrewMember";
import { BuildingTypes } from "../../Enums";

export class StuffOnRoundStart
{
	constructor (Player: SelfFoAPlayer)
	{
		this.StartingBuildings =
			[
				new Headquarters(undefined, (Player.FoAPlayerSettings.BuildingVisualsSettings ?? new BuildingVisualsSettings(new Map())).GetVisualsForBuilding(BuildingTypes.HQ))
			];
		this.StartingCrew = [];
		this.StartingEntities = []
	}

	StartingBuildings: IBuilding[];

	StartingCrew: CrewMember[];

	StartingEntities: Entity[];


}