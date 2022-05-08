import { MetricUnits, PartType, Species, TimeUnits } from "../../../consts/Enums";
import { Geometry } from "../../util/measurements/Geometry";
import { Mass } from "../../util/measurements/Mass";
import { Rate } from "../../util/measurements/Rate";
import { Entity } from "../entities/Entity";
import { IId } from "../entities/Unique";
import { Storable } from "../resources/specifics/Resource";
import { StorageContainer } from "../resources/StorageContainer";
import { CrewMember } from "./CrewMember";
import { Engine } from "./parts/specifics/Engine";
import { VesselFrame } from "./parts/specifics/VesselFrame";
import { VesselPart } from "./parts/VesselPart";
import { VesselStats } from "./parts/VesselStats";

export class Vessel extends Entity
{
	constructor (Id: number, Name: string, VesselParts: VesselPart[], Crew: CrewMember[])
	{
		super(Id, VesselParts, Name, Species.Vessel);
		this.Crew = Crew;
	}

	Crew: CrewMember[];

	ThrottleForward: number = 0;

	ThrottleRotation: number = 0;

	

	static GetPositionalAverageOfVessel (V: Vessel): Vector3
	{
		let Sum = Vector3.zero;
		let Iterations = 0;
		V.Parts.forEach(VP =>
		{
			Sum = Sum.add(VesselPart.GetModelCenter(VP as VesselPart));
			Iterations++;
		});
		return Sum.div(Iterations);
	}

	static ChangeVesselThrottles (V: Vessel, ThrottleForward: number, ThrottleRotation: number)
	{
		V.ThrottleForward = math.clamp(ThrottleForward, -1, 1);
		V.ThrottleRotation = math.clamp(ThrottleRotation, -1, 1);
	}

	/**
	 * Will rotate the vessel towards the target position.
	 * @param V
	 * @param Rotation
	 */
	static RotateVesselTowards (V: Vessel, TargetPosition: Vector3)
	{

	}

	/**
	 * Will move the target vessel forward in the direction it is facing until it reaches as close to the parameter as possible.
	 * @param V
	 * @param MoveTo
	 */
	static MoveVesselTo (V: Vessel, MoveTo: Vector3)
	{
		let CurrentPos = Vessel.GetPositionalAverageOfVessel(V);
		Vessel.RotateVesselTowards(V, MoveTo);
		let Stats = Vessel.GetVesselStats(MetricUnits.Base, TimeUnits.Second, V);
		let TargetSpeed = new Rate(Stats.MaxSpeedPotential.DistanceValue * V.ThrottleForward, MetricUnits.Base, Stats.MaxSpeedPotential.TimeValue, TimeUnits.Second);
		V.Parts.forEach(_P =>
		{
			let P = _P as VesselPart;
			P.ModelOfPart.
		});
	}

	static StopMovingVessel (V: Vessel)
	{
	}

	static GetPartsOfType<T extends VesselPart> (V: Vessel, PartTypeEnum: PartType): T[]
	{
		let Ret: T[] = [];
		V.Parts.forEach(_P =>
		{
			let P = _P as VesselPart;
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
		V.Parts.forEach(VP =>
		{
			let PartMass = Geometry.GetMass(DUnits, VP.Geometry);
			TotalMass = new Mass(DUnits, TotalMass.Weight + PartMass.Weight);
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

		let MaxSpeedPotential =			Mass.GetSpeedPotential(TotalMass, TotalSpeedPerOne);
		let MaxRotationPotential =		Mass.GetSpeedPotential(TotalMass, TotalRotationPerOne);

		return new VesselStats(MaxSpeedPotential, MaxRotationPotential);
	}
}