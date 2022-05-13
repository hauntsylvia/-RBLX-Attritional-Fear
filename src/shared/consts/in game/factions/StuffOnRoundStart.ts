import { Headquarters } from "../../../classes/in game/buildings/Headquarters";
import { IBuilding } from "../../../classes/in game/buildings/interfaces/IBuilding";
import { Entity } from "../../../classes/in game/entities/Entity";
import { SelfFoAFaction } from "../../../classes/in game/factions/SelfFoAFaction";
import { BuildingVisualsSettings } from "../../../classes/in game/players/personalizations/specifics/BuildingVisualsSettings";
import { SelfFoAPlayer } from "../../../classes/in game/players/SelfFoAPlayer";
import { StorageContainer } from "../../../classes/in game/resources/StorageContainer";
import { CrewMember } from "../../../classes/in game/vessels/CrewMember";
import { Engine } from "../../../classes/in game/vessels/parts/specifics/Engine";
import { NavBridge } from "../../../classes/in game/vessels/parts/specifics/NavBridge";
import { VesselFrame } from "../../../classes/in game/vessels/parts/specifics/VesselFrame";
import { Vessel } from "../../../classes/in game/vessels/Vessel";
import { Geometry } from "../../../classes/util/measurements/Geometry";
import { Rate } from "../../../classes/util/measurements/Rate";
import { BuildingTypes, MetricUnits, TimeUnits } from "../../Enums";

export class StuffOnRoundStart
{
	constructor (Player: SelfFoAPlayer)
	{
		this.StartingBuildings =
			[
				new Headquarters(undefined, (Player.FoAPlayerSettings.BuildingVisualsSettings ?? new BuildingVisualsSettings(new Map())).GetVisualsForBuilding(BuildingTypes.HQ))
			];

		let G = new Geometry(MetricUnits.Base, 5, 5, 5, 10);

		let E = new Engine("Logic Vessel Part", "Yes, this is actually a piece of logic air.", [], G, "Small 12 Cylinder Diesel Engine",
			new StorageContainer([], Geometry.GetVolumeOfGeometry(MetricUnits.Base, G)),
			[],
			new Rate(120, MetricUnits.Kilo, 1, TimeUnits.Minute));

		let N = new NavBridge("Logic Vessel Part", "Yes, this is actually a piece of logic air.", [], G, "",
			new StorageContainer([], Geometry.GetVolumeOfGeometry(MetricUnits.Base, G)),
			[],
			new Rate(40, MetricUnits.RobloxStud, 1, TimeUnits.Minute));

		let Frame = new VesselFrame("Logic Vessel Part", "Yes, this is actually a piece of logic air.", [], G, "",
			new StorageContainer([], Geometry.GetVolumeOfGeometry(MetricUnits.Base, G)),
			[],
			new Rate(40, MetricUnits.RobloxStud, 1, TimeUnits.Minute));

		let V = new Vessel(1, "Logic Air",
			[E, N, Frame], [new CrewMember(1, "Izolabella")]);

		this.StartingCrew = [];
		this.StartingVessels = [V]
	}

	StartingBuildings: IBuilding[];

	StartingCrew: CrewMember[];

	StartingVessels: Vessel[];


}