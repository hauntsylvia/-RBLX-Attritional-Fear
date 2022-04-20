import { Sleep } from "../../util/Sleep";

export class NoiseHelper
{
	constructor (Z: number, Height: number, Width: number, Exponent: number)
	{
		this.Height = Height;
		this.Width = Width;
		this.Z = Z;
		this.Exponent = Exponent;
		this.Map = NoiseHelper.GenerateHeightmap(Height, Width, Z, Exponent);
	}

	Height: number;
	Width: number;
	Z: number;
	Exponent: number;
	Map: number[][];

	private static RidgedNoise (nx: number, ny: number, Z: number)
	{
		return 2 * (0.5 - math.abs(0.5 - (math.noise(nx, ny, Z) + 0.5)));
	}

	static GenerateTemperatureMap (Height: number, Width: number): number[][]
	{
		let NewMap: number[][] = [];
		let EquatorAtY: number = Height / 2;
		for (let X = 0; X < Width; X++)
		{
			NewMap[X] = [];
			for (let Y = 0; Y < Height; Y++)
			{
				let DistanceFromEq = math.abs(Y - EquatorAtY);
				let Inv = (EquatorAtY - DistanceFromEq);
				NewMap[X][Y] = math.clamp(Inv / EquatorAtY, 0, 1);
			}
		}
		return NewMap;
	}

	static GenerateHeightmap (Height: number, Width: number, Z: number, Exponent: number): number[][]
	{
		let Amp1 = 1;
		let Amp2 = 0.5;
		let Amp3 = 0.25;
		let Elevation: number[][] = [[]];
		for (let X = 0; X < Height; X++)
		{
			Elevation[X] = [];
			for (let Y = 0; Y < Width; Y++)
			{
				//this.Elevation[X][Y] = [];
				//for (let Z = 0; Z < Width; Z++)
				//{
				//	let nx = X / Width - 0.5;
				//	let ny = Y / Height - 0.5;
				//	let nz = Z / Width - 0.5;
				//	let Noise = math.noise(nx * 4, ny * 4, nz * 4);
				//	this.Elevation[X][Y][Z] = Noise + 0.5;
				//}
				let nx = X / Height - 0.5;
				let ny = Y / Width - 0.5;

				//let Noise = (math.noise(nx * Frequency, ny * Frequency, Z) + 0.5);
				let E0 = Amp1 * this.RidgedNoise(1 / Amp1 * nx, 1 / Amp1 * ny, Z);
				let E1 = Amp2 * this.RidgedNoise(1 / Amp2 * nx, 1 / Amp2 * ny, Z) * E0;
				let E2 = Amp3 * this.RidgedNoise(1 / Amp3 * nx, 1 / Amp3 * ny, Z) * (E0 + E1);
				let E = (E0 + E1 + E2) / (Amp1 + Amp2 + Amp3);
				E = math.pow(E, Exponent);
				Elevation[X][Y] = math.clamp(E, 0, 1);
			}
		}
		return Elevation;
	}
}