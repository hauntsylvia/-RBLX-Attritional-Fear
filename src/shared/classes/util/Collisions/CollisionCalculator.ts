import { CollisionCalculatorResult } from "./CollisionCalculatorResult";

export class CollisionCalculator
{
	static RayLocation: Part | undefined;
	private static CalculateAllAngles (CFrameToCheck: CFrame, Distance: number): CollisionCalculatorResult
	{
		let Ray = new RaycastParams();
		Ray.FilterType = Enum.RaycastFilterType.Blacklist;
		let Max = CFrameToCheck.mul(new Vector3(0, 0, -Distance));
		let ToPoint = Max.sub(CFrameToCheck.Position).Unit.mul(Distance);
		let RayResult = game.GetService("Workspace").Raycast(CFrameToCheck.mul(new CFrame(0, 0, -Distance)).Position, ToPoint, Ray);
		if (RayResult !== undefined)
		{
			return new CollisionCalculatorResult(true, RayResult);
		}
		return new CollisionCalculatorResult(false);
	}

	static HasNearbyEntities (CFrameToCheck: CFrame, DistanceToCheck: number): CollisionCalculatorResult
	{
		return this.CalculateAllAngles(CFrameToCheck, DistanceToCheck);
	}
}