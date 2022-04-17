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
		let RayResult = game.GetService("Workspace").Raycast(CFrameToCheck.Position, ToPoint, Ray);
		if (CollisionCalculator.RayLocation !== undefined)
		{
			if (RayResult !== undefined)
			{
				print(RayResult.Instance.GetFullName());
				CollisionCalculator.RayLocation.Color = Color3.fromRGB(255, 50, 50);
				CollisionCalculator.RayLocation.Transparency = 0.5;
				CollisionCalculator.RayLocation.CFrame = CFrameToCheck.add(ToPoint.Unit.div(2)).add(new Vector3(2, 0, 0));
			}
			else
			{
				CollisionCalculator.RayLocation.Color = Color3.fromRGB(255, 255, 255);
				CollisionCalculator.RayLocation.Transparency = 0.9;
				CollisionCalculator.RayLocation.CFrame = CFrameToCheck.add(ToPoint.Unit.div(2)).add(new Vector3(2, 0, 0));
				CollisionCalculator.RayLocation.Size = new Vector3(0.1, 0.1, CFrameToCheck.Position.sub(ToPoint).Magnitude);
			}
		}
		else
		{
			CollisionCalculator.RayLocation = new Instance("Part", game.Workspace);
			CollisionCalculator.RayLocation.Name = "rayloc";
			CollisionCalculator.RayLocation.Size = new Vector3(0.1, 0.1, 0.1);
			CollisionCalculator.RayLocation.Material = Enum.Material.Neon;
			CollisionCalculator.RayLocation.Color = Color3.fromRGB(255, 255, 255);
			CollisionCalculator.RayLocation.Transparency = 0.9;
			CollisionCalculator.RayLocation.CanCollide = false;
		}
		if (game.GetService("UserInputService").IsKeyDown(Enum.KeyCode.U))
		{
			print(CFrameToCheck.Position);
		}
		return new CollisionCalculatorResult(false);
	}

	static HasNearbyEntities (CFrameToCheck: CFrame, DistanceToCheck: number): CollisionCalculatorResult
	{
		return this.CalculateAllAngles(CFrameToCheck, DistanceToCheck);
	}
}