import { CollisionCalculatorResult } from "./CollisionCalculatorResult";

export class CollisionCalculator
{
	private static CalculateByDistance (StartingPoint: CFrame, DistanceAhead: number, Params: RaycastParams): RaycastResult | undefined
	{
		//let Max = StartingPoint.mul(new Vector3(0, 0, -DistanceAhead));
		//let ToPoint = Max.sub(StartingPoint.Position).Unit.mul(DistanceAhead);
		//let RayResult = game.GetService("Workspace").Raycast(StartingPoint.mul(new CFrame(0, 0, -DistanceAhead)).Position, ToPoint, Params);
		//let EndPosition = StartingPoint.mul(new CFrame(0, 0, -DistanceAhead));
		let EndPosition = StartingPoint.Position.add(StartingPoint.LookVector.mul(DistanceAhead));
		let RayResult = game.GetService("Workspace").Raycast(StartingPoint.Position, (EndPosition.sub(StartingPoint.Position)).Unit.mul(DistanceAhead), Params);
		return RayResult;
	}

	static Calculate (Start: CFrame, End: Vector3, DistanceToUnitDirection: number, Params: RaycastParams): CollisionCalculatorResult
	{
		let RayResult = game.GetService("Workspace").Raycast(Start.Position, (End.sub(Start.Position)).Unit.mul(DistanceToUnitDirection), Params);
		return new CollisionCalculatorResult(RayResult !== undefined, RayResult);
	}

	static CalculateAhead (CFrameToCheck: CFrame, Distance: number, Params: RaycastParams): CollisionCalculatorResult
	{
		let RayResult = CollisionCalculator.CalculateByDistance(CFrameToCheck, Distance, Params);
		return new CollisionCalculatorResult(RayResult !== undefined, RayResult);
	}

	static CalculateByBoundingBox (PositionToCheck: CFrame, BoundingBox: Vector3, InstancesToIgnore: Instance[] = []): BasePart[]
	{
		let Part = new Instance("Part");
		Part.Name = "Bounding";
		Part.Size = BoundingBox;
		Part.CFrame = PositionToCheck;
		Part.Parent = game.GetService("Workspace");
		Part.Anchored = true;
		Part.Transparency = 1;

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
		Part.Destroy();
		return Final;
	}
}