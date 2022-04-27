import { Sleep } from "../../util/Sleep";

export class NoiseHelper
{
	private static RidgedNoise (nx: number, ny: number, Z: number)
	{
		return 2 * (0.5 - math.abs(0.5 - (math.noise(nx, ny, Z) + 0.5)));
	}

	static GenerateTemperatureMap (XStart: number, YStart: number, XMax: number, YMax: number, MapBoundaryMax: number, Sleeper: Sleep): number[][]
	{
		let NewMap: number[][] = [];
		let EquatorAtY: number = MapBoundaryMax / 2;
		for (let X = XStart; X < MapBoundaryMax && X < XMax; X++)
		{
			NewMap[X] = [];
			for (let Y = YStart; Y < MapBoundaryMax && Y < YMax; Y++)
			{
				Sleeper.Step();

				let DistanceFromEq = math.abs(Y - EquatorAtY);
				let Inv = (EquatorAtY - DistanceFromEq);
				NewMap[X][Y] = math.clamp(Inv / EquatorAtY, 0, 1);
			}
		}
		return NewMap;
	}

	static GenerateHeightmap (XStart: number, YStart: number, XMax: number, YMax: number, MapBoundaryWidth: number, Frequency: number, Z: number, Exponent: number, Sleeper: Sleep): number[][]
	{
		let Elevation: number[][] = [];
		if (game.GetService("RunService").IsClient() && game.GetService("UserInputService").IsKeyDown(Enum.KeyCode.U))
		{
			print(XStart + ", " + YStart + " - NoiseHelper start.");
			print(XMax + ", " + YMax + " - NoiseHelper end.");
			print(MapBoundaryWidth + ", " + MapBoundaryWidth + " - NoiseHelper boundary.");
		}
		for (let X = XStart; X < MapBoundaryWidth && X < XMax; X++)
		{
			Elevation[X] = [];
			for (let Y = YStart; Y < MapBoundaryWidth && Y < YMax; Y++)
			{
				Sleeper.Step();
				//this.Elevation[X][Y] = [];
				//for (let Z = 0; Z < Width; Z++)
				//{
				//	let nx = X / Width - 0.5;
				//	let ny = Y / Height - 0.5;
				//	let nz = Z / Width - 0.5;
				//	let Noise = math.noise(nx * 4, ny * 4, nz * 4);
				//	this.Elevation[X][Y][Z] = Noise + 0.5;
				//}
				let nx = X / MapBoundaryWidth - 0.5;
				let ny = Y / MapBoundaryWidth - 0.5;

				//let Noise = (math.noise(nx * Frequency, ny * Frequency, Z) + 0.5);
				//let E0 = Amp1 * this.RidgedNoise(1 / Amp1 * nx, 1 / Amp1 * ny, Z);
				//let E1 = Amp2 * this.RidgedNoise(1 / Amp2 * nx, 1 / Amp2 * ny, Z) * E0;
				//let E2 = Amp3 * this.RidgedNoise(1 / Amp3 * nx, 1 / Amp3 * ny, Z) * (E0 + E1);
				//let E0 = Amp1 * (math.noise(1 / Amp1 * nx, 1 / Amp1 * ny, Z) + 0.5);
				let E0 = this.RidgedNoise(Frequency * nx, Frequency * ny, Z);
				let E1 = 0.25 * (math.noise(4 * nx, 4 * ny, Z) + 0.5);
				let E = (E0 + E1);
				E = math.pow(E, Exponent);
				Elevation[X][Y] = math.clamp(E, 0, 1);
			}
		}
		return Elevation;
	}
}