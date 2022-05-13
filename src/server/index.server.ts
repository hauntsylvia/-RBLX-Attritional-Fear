
import { Storable } from "../shared/classes/in game/resources/specifics/Resource";
import { StorageContainer } from "../shared/classes/in game/resources/StorageContainer";
import { CrewMember } from "../shared/classes/in game/vessels/CrewMember";
import { Engine } from "../shared/classes/in game/vessels/parts/specifics/Engine";
import { VesselFrame } from "../shared/classes/in game/vessels/parts/specifics/VesselFrame";
import { VesselPart } from "../shared/classes/in game/vessels/parts/VesselPart";
import { Vessel } from "../shared/classes/in game/vessels/Vessel";
import { Geometry } from "../shared/classes/util/measurements/Geometry";
import { Rate } from "../shared/classes/util/measurements/Rate";
import { Volume } from "../shared/classes/util/measurements/Volume";
import { MetricUnits, PartType, TimeUnits } from "../shared/consts/Enums";
import { Server } from "./classes/server communication/Server";

let G = new Geometry(MetricUnits.Base, 5, 5, 5, 10);
let Gh = new Geometry(MetricUnits.Base, 5, 5, 5, 100);
let E = new Engine("Logic Vessel Part", "Yes, this is actually a piece of logic air.", [], G, "Small 12 Cylinder Diesel Engine",
	new StorageContainer([], Geometry.GetVolumeOfGeometry(MetricUnits.Base, G)),
	[],
	new Rate(120, MetricUnits.Kilo, 1, TimeUnits.Minute));

let V = new Vessel(1, "Logic Air",
	[E], [new CrewMember(1, "Izolabella")]);
Vessel.ChangeVesselThrottles(V, 1, 0);
Vessel.MoveVesselTo(V, new Vector3(100, 100, 100));

new Server();

export {};