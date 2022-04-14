export class LevelOfZoom
{
	CameraSubject: Model;
	CameraDistance: number;
	constructor (CameraSubject: Model, CameraDistance: number)
	{
		this.CameraSubject = CameraSubject;
		this.CameraDistance = CameraDistance;
	}
}