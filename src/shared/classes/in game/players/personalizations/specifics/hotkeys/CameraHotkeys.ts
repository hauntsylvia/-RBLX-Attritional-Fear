export class CameraHotkeys
{
	ZoomIn: string;
	ZoomOut: string;

	LoZZoomOut: string;
	LoZZoomIn: string;

	MoveForward: string;
	MoveBackward: string;
	MoveLeft: string;
	MoveRight: string;

	CameraSensitivity: number;
	CameraSpeed: number;

	constructor (ZoomIn: string, ZoomOut: string, LoZZoomOut: string, LoZZoomIn: string, MoveForward: string, MoveBackward: string, MoveLeft: string, MoveRight: string, CameraSensitivity: number, CameraSpeed: number)
	{
		this.ZoomIn = ZoomIn;
		this.ZoomOut = ZoomOut;
		this.LoZZoomOut = LoZZoomOut;
		this.LoZZoomIn = LoZZoomIn;

		this.MoveForward = MoveForward;
		this.MoveBackward = MoveBackward;
		this.MoveLeft = MoveLeft;
		this.MoveRight = MoveRight;

		this.CameraSensitivity = CameraSensitivity;
		this.CameraSpeed = CameraSpeed;
	}
}