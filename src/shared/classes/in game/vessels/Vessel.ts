import { StorageContainer } from "../resources/StorageContainer";
import { CrewMember } from "./CrewMember";
import { VesselPart } from "./parts/VesselPart";

export class Vessel
{
	constructor (Name: string, VesselParts: VesselPart[], Crew: CrewMember[])
	{
		this.Name = Name;
		this.VesselParts = VesselParts;
		this.Crew = Crew;
	}

	Name: string;

	VesselParts: VesselPart[];

	Crew: CrewMember[];
}