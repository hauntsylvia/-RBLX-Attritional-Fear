import { FoAClient } from "../../../../client/classes/clients/FoAClient";
import { Processor } from "../../../../client/classes/processors/Processor";
import { MetricUnits, PartType, Species, TimeUnits } from "../../../consts/Enums";
import { VesselCondition } from "../../../consts/in game/entities/conditions/VesselCondition";
import { Geometry } from "../../util/measurements/Geometry";
import { Mass } from "../../util/measurements/Mass";
import { Rate } from "../../util/measurements/Rate";
import { Entity } from "../entities/Entity";
import { IId } from "../entities/Unique";
import { Storable } from "../resources/specifics/Resource";
import { StorageContainer } from "../resources/StorageContainer";
import { CrewMember } from "./CrewMember";
import { Engine } from "./parts/specifics/Engine";
import { NavBridge } from "./parts/specifics/NavBridge";
import { VesselFrame } from "./parts/specifics/VesselFrame";
import { VesselPart } from "./parts/VesselPart";
import { VesselStats } from "./parts/VesselStats";

export class Vessel extends Entity
{
	constructor (Id: number | undefined, Name: string, VesselParts: VesselPart[], Crew: CrewMember[])
	{
		let NavB = VesselParts.find(P => P.Type === PartType.NavBridge);
		super(Id, VesselParts, Name, Species.Vessel, new VesselCondition(), NavB !== undefined ? (NavB as NavBridge).SightRadiusMax : new Rate(0, MetricUnits.Base, 1, TimeUnits.Second));
		this.VesselPartsSpecifically = VesselParts;
		this.Crew = Crew;
	}

	Crew: CrewMember[];

	ThrottleForward: number = 0;

	ThrottleRotation: number = 0;

	CurrentForwardSpeed: Rate = new Rate(0, MetricUnits.Base, 1, TimeUnits.Hour);

	CurrentRotationalSpeed: Rate = new Rate(0, MetricUnits.Base, 1, TimeUnits.Hour);

	CurrentFuelConsumption: Rate = new Rate(0.5, MetricUnits.Base, 1, TimeUnits.Hour);

	VesselPartsSpecifically: VesselPart[];

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
		let Base = MetricUnits.Base;
		let TU = TimeUnits.Second;

		let CurrentPos = Vessel.GetPositionalAverage(V);
		Vessel.RotateVesselTowards(V, MoveTo);
		let Stats = Vessel.GetVesselStats(Base, TU, V);
		let TargetSpeed = new Rate(Stats.MaxSpeedPotential.DistanceValue * V.ThrottleForward, Base, Stats.MaxSpeedPotential.TimeValue, TU);
		let DistanceInStuds = CurrentPos.sub(MoveTo).Magnitude;
		let Distance = (DistanceInStuds / MetricUnits.RobloxStud) / Base;
		let Time = Distance / TargetSpeed.DistanceValue;
		let TimeUnit = TimeUnits[TargetSpeed.TimeUnit];
		let DistanceUnit = MetricUnits[TargetSpeed.DistanceUnits];
		print("Moving at: " + TargetSpeed.DistanceValue + DistanceUnit + "s every " + TargetSpeed.TimeValue + TimeUnit);
		print("ETA: " + Time + TimeUnit + "s");
		print("Distance: " + Distance + DistanceUnit + "s");
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
		let NavBs = Vessel.GetPartsOfType<NavBridge>(V, PartType.NavBridge);

		let TotalMass: Mass = new Mass(DUnits, 0);
		V.Parts.forEach(VP =>
		{
			let PartMass = Geometry.GetMass(DUnits, VP.Geometry);
			TotalMass = new Mass(DUnits, TotalMass.Weight + PartMass.Weight);
		});
		print("Part count: " + V.Parts.size());

		let TotalSpeedPerOne = new Rate(0, DUnits, 1, TUnits);
		Engines.forEach(Engine =>
		{
			let SpeedToUnits = Rate.Convert(DUnits, TUnits, Engine.Speed);
			TotalSpeedPerOne = new Rate(TotalSpeedPerOne.DistanceValue + SpeedToUnits.DistanceValue, DUnits, SpeedToUnits.TimeValue, TUnits);
		});
		print("Engine count: " + Engines.size());

		let TotalRotationPerOne = new Rate(0, DUnits, 1, TUnits);
		Frames.forEach(Frame =>
		{
			let SpeedToUnits = Rate.Convert(DUnits, TUnits, Frame.Speed);
			TotalRotationPerOne = new Rate(TotalRotationPerOne.DistanceValue + SpeedToUnits.DistanceValue, DUnits, SpeedToUnits.TimeValue, TUnits);
		});
		print("Frame count: " + Frames.size());

		let TotalSight = new Rate(0, DUnits, 1, TUnits);
		NavBs.forEach(N =>
		{
			let SightToUnits = Rate.Convert(DUnits, TUnits, N.SightRadiusMax);
			TotalSight = new Rate(TotalSight.DistanceValue + SightToUnits.DistanceValue, DUnits, SightToUnits.TimeValue, TUnits);
		});

		let MaxSpeedPotential = Mass.GetSpeedPotential(TotalMass, TotalSpeedPerOne);
		let MaxRotationPotential = Mass.GetSpeedPotential(TotalMass, TotalRotationPerOne);

		return new VesselStats(MaxSpeedPotential, MaxRotationPotential, new Rate(0.5, MetricUnits.Base, 1, TimeUnits.Second), TotalSight);
	}
}

