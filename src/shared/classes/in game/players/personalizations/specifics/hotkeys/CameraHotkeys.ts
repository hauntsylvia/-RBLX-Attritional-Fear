export class CameraHotkeys
{
	constructor (ZoomIn: string, ZoomOut: string, LoZZoomOut: string, LoZZoomIn: string, MoveForward: string, MoveBackward: string, MoveLeft: string, MoveRight: string, RotateLeft: string, RotateRight: string, CameraSensitivity: number, CameraSpeed: number)
	{
		this.ZoomIn = ZoomIn;
		this.ZoomOut = ZoomOut;
		this.LoZZoomOut = LoZZoomOut;
		this.LoZZoomIn = LoZZoomIn;

		this.MoveForward = MoveForward;
		this.MoveBackward = MoveBackward;
		this.MoveLeft = MoveLeft;
		this.MoveRight = MoveRight;
		this.RotateLeft = RotateLeft;
		this.RotateRight = RotateRight;

		this.CameraZoomSensitivity = CameraSensitivity;
		this.CameraSpeed = CameraSpeed;
	}

	ZoomIn: string;
	ZoomOut: string;

	LoZZoomOut: string;
	LoZZoomIn: string;

	MoveForward: string;
	MoveBackward: string;
	MoveLeft: string;
	MoveRight: string;
	RotateLeft: string;
	RotateRight: string;

	CameraZoomSensitivity: number;
	CameraSpeed: number;

}