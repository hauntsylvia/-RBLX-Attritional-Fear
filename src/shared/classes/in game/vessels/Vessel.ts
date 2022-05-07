import { MetricUnits, PartType } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { Mass } from "../../util/measurements/Mass";
import { Speed } from "../../util/measurements/Speed";
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

	static GetVesselStats (Units: MetricUnits, V: Vessel): VesselStats
	{
		let Engines = Vessel.GetPartsOfType<Engine>(V, PartType.Engine);
		let Frames = Vessel.GetPartsOfType<VesselFrame>(V, PartType.VesselFrame);

		let TotalMass: Mass = new Mass(Units, 0);
		V.VesselParts.forEach(VP =>
		{
			VP.Parts.forEach(Part =>
			{
				let PartMass = Geometry.GetMass(Units, Part.Geometry);
				TotalMass = new Mass(Units, TotalMass.Weight + PartMass.Weight);
			});
		});

		let TotalSpeedAtZero = new Speed(Units, 0);
		Engines.forEach(Engine =>
		{
			let SpeedToUnits = Speed.ConvertToUnits(Units, Engine.SpeedAtBase);
			TotalSpeedAtZero = new Speed(Units, TotalSpeedAtZero.MaxVelocityInOneSecond + SpeedToUnits.MaxVelocityInOneSecond);
		});

		let TotalRotationAtZero = new Speed(Units, 0);
		Frames.forEach(Frame =>
		{
			let SpeedToUnits = Speed.ConvertToUnits(Units, Frame.SpeedAtBase);
			TotalRotationAtZero = new Speed(Units, TotalRotationAtZero.MaxVelocityInOneSecond + SpeedToUnits.MaxVelocityInOneSecond);
		});

		let SpeedAdjustedForMass =		Mass.GetSpeedPotential(Units, TotalMass, TotalSpeedAtZero);
		let RotationAdjustedForMass =	Mass.GetSpeedPotential(Units, TotalMass, TotalRotationAtZero);

		return new VesselStats(SpeedAdjustedForMass, RotationAdjustedForMass);
	}
}