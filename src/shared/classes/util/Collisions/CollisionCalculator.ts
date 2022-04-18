import { CollisionCalculatorResult } from "./CollisionCalculatorResult";

export class CollisionCalculator
{
	private static Calculate (CFrameTC: CFrame, Distance: number, InstancesToIgnore: Instance[] = []): RaycastResult | undefined
	{
		let Ray = new RaycastParams();
		Ray.FilterType = Enum.RaycastFilterType.Blacklist;
		Ray.FilterDescendantsInstances = InstancesToIgnore;
		let Max = CFrameTC.mul(new Vector3(0, 0, -Distance));
		let ToPoint = Max.sub(CFrameTC.Position).Unit.mul(Distance);
		let RayResult = game.GetService("Workspace").Raycast(CFrameTC.mul(new CFrame(0, 0, -Distance)).Position, ToPoint, Ray);
		return RayResult;
	}

	static CalculateAhead (CFrameToCheck: CFrame, Distance: number, InstancesToIgnore: Instance[] = []): CollisionCalculatorResult
	{
		let RayResult = CollisionCalculator.Calculate(CFrameToCheck, Distance, InstancesToIgnore);
		return new CollisionCalculatorResult(true, RayResult);
	}

	static CalculateByBoundingBox (PositionToCheck: CFrame, BoundingBox: Vector3, InstancesToIgnore: Instance[] = []): BasePart[]
	{
		let Part = new Instance("Part", game.GetService("Workspace"));
		Part.Name = "Bounding - Collision Calculator";
		Part.Size = BoundingBox;
		Part.CFrame = PositionToCheck;
		let Final: BasePart[] = [];
		let Touching = Part.GetTouchingParts();
		Touching.forEach(T =>
		{
			let Ignore = false;
			InstancesToIgnore.forEach(I =>
			{
				if (I === T)
				{
					Ignore = true;
				}
			});
			if (!Ignore)
			{
				Final.push(T);
			}
		});
		Part.CanCollide = false;
		Part.Destroy();
		return Final;
	}
}