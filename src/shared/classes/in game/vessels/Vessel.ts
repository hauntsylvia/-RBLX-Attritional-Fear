import { MetricUnits, PartType, TimeUnits } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { Mass } from "../../util/measurements/Mass";
import { Rate } from "../../util/measurements/Rate";
import { Storable } from "../resources/specifics/Resource";
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

	static RotateVesselTowards (V: Vessel, Rotation: CFrame)
	{

	}

	static MoveVesselTo (V: Vessel, MoveTo: Vector3)
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

	static GetVesselStats (DUnits: MetricUnits, TUnits: TimeUnits, V: Vessel): VesselStats
	{
		let Engines = Vessel.GetPartsOfType<Engine>(V, PartType.Engine);
		let Frames = Vessel.GetPartsOfType<VesselFrame>(V, PartType.VesselFrame);

		let TotalMass: Mass = new Mass(DUnits, 0);
		V.VesselParts.forEach(VP =>
		{
			VP.Parts.forEach(Part =>
			{
				let PartMass =		Geometry.GetMass(DUnits, Part.Geometry);
				TotalMass =			new Mass(DUnits, TotalMass.Weight + PartMass.Weight);
			});
		});

		let TotalSpeedPerOne =		new Rate(0, DUnits, 1, TUnits);
		Engines.forEach(Engine =>
		{
			let SpeedToUnits =		Rate.Convert(DUnits, TUnits, Engine.Speed);
			TotalSpeedPerOne =		new Rate(TotalSpeedPerOne.DistanceValue + SpeedToUnits.DistanceValue, DUnits, 1, TUnits);
		});

		let TotalRotationPerOne =	new Rate(0, DUnits, 1, TUnits);
		Frames.forEach(Frame =>
		{
			let SpeedToUnits =		Rate.Convert(DUnits, TUnits, Frame.Speed);
			TotalRotationPerOne =	new Rate(TotalRotationPerOne.DistanceValue + SpeedToUnits.DistanceValue, DUnits, 1, TUnits);
		});

		let SpeedAdjustedForMass =		Mass.GetSpeedPotential(TotalMass, TotalSpeedPerOne);
		let RotationAdjustedForMass =	Mass.GetSpeedPotential(TotalMass, TotalRotationPerOne);

		return new VesselStats(SpeedAdjustedForMass, RotationAdjustedForMass);
	}
}