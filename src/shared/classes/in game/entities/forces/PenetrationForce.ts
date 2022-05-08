import { Geometry } from "../../../util/measurements/Geometry";

export class PenetrationForce
{
	constructor (ProjectileGeometry: Geometry, PenetrationDepthMeters: number)
	{
		this.ProjectileGeometry = ProjectileGeometry;
		this.PenetrationDepthMeters = PenetrationDepthMeters;
	}

	ProjectileGeometry: Geometry;

	PenetrationDepthMeters: number;
}