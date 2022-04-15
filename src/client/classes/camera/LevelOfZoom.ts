export class LevelOfZoom
{
	constructor (CameraSubject: Model, CameraDistance: number, CameraAngle: number)
	{
		this.CameraSubject = CameraSubject;
		this.CameraDistance = CameraDistance;
		this.CameraAngle = CameraAngle;
	}
	CameraSubject: Model;
	CameraDistance: number;
	CameraAngle: number;
}