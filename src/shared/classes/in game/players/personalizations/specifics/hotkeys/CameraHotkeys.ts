export class CameraHotkeys
{
	ZoomIn: Enum.UserInputType;
	ZoomOut: Enum.UserInputType;

	LoZZoomOut: Enum.KeyCode;
	LoZZoomIn: Enum.KeyCode;

	MoveForward: Enum.KeyCode;
	MoveBackward: Enum.KeyCode;
	MoveLeft: Enum.KeyCode;
	MoveRight: Enum.KeyCode;
	constructor (ZoomIn: Enum.UserInputType, ZoomOut: Enum.UserInputType, LoZZoomOut: Enum.KeyCode, LoZZoomIn: Enum.KeyCode, MoveForward: Enum.KeyCode, MoveBackward: Enum.KeyCode, MoveLeft: Enum.KeyCode, MoveRight: Enum.KeyCode)
	{
		this.ZoomIn = ZoomIn;
		this.ZoomOut = ZoomOut;
		this.LoZZoomOut = LoZZoomOut;
		this.LoZZoomIn = LoZZoomIn;

		this.MoveForward = MoveForward;
		this.MoveBackward = MoveBackward;
		this.MoveLeft = MoveLeft;
		this.MoveRight = MoveRight;
	}
}