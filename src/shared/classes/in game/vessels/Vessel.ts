import { PartType } from "../../../consts/Enums";
import { StorageContainer } from "../resources/StorageContainer";
import { CrewMember } from "./CrewMember";
import { Engine } from "./parts/specifics/Engine";
import { VesselFrame } from "./parts/specifics/VesselFrame";
import { VesselPart } from "./parts/VesselPart";
import { VesselStats } from "./parts/VesselStats";

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

	static MoveVesselTo (V: Vessel, MoveTo: CFrame)
	{

	}

	static GetPartsOfType<T extends VesselPart> (V: Vessel, PartTypeEnum: PartType): T[]
	{
		let Ret: T[] = [];
		V.VesselParts.forEach(P =>
		{
			if (P.Type === PartTypeEnum)
			{
				Ret.push((P as T));
			}
		});
		return Ret;
	}

	static GetVesselStats (V: Vessel): VesselStats
	{
		let TotalWeightIncResources = 0;
		V.VesselParts.forEach(P =>
		{
			TotalWeightIncResources = P.WeightInKG;
			P.StorageOfPart.CurrentResources.forEach(CRes =>
			{
				TotalWeightIncResources += CRes.WeightInKG;
			});
		});

		let Engines = Vessel.GetPartsOfType<Engine>(V, PartType.Engine);
		let Frame = Vessel.GetPartsOfType<VesselFrame>(V, PartType.VesselFrame)[0];

		let TotalMaxSpeed = 0;
		Engines.forEach(E =>
		{
			TotalMaxSpeed += E.TimeToMove1000KGOfMass1StudInSeconds * (1000 / TotalWeightIncResources);
		});
		let MaxRotSpeed = Frame.TimeToMove1000KGOfMass1DegreeInSeconds * (1000 / TotalWeightIncResources);
		
		return new VesselStats(TotalMaxSpeed, MaxRotSpeed, TotalWeightIncResources);
	}
}