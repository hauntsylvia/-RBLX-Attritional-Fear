import { Sleep } from "../../util/Sleep";

export class NoiseHelper
{
	constructor (Z: number, Height: number, Width: number, Exponent: number)
	{
		this.Height = Height;
		this.Width = Width;
		this.Map = this.GenerateHeightmap(Z, Exponent);
	}

	Height: number;
	Width: number;
	Map: number[][];

	private RidgedNoise (nx: number, ny: number, Z: number)
	{
		return 2 * (0.5 - math.abs(0.5 - (math.noise(nx, ny, Z) + 0.5)));
	}

	GenerateTemperatureMap (): number[][]
	{
		let NewMap: number[][] = [];
		let EquatorAtY: number = this.Height / 2;
		for (let X = 0; X < this.Width; X++)
		{
			NewMap[X] = [];
			for (let Y = 0; Y < this.Height; Y++)
			{
				let DistanceFromEq = math.abs(Y - EquatorAtY);
				let Inv = (EquatorAtY - DistanceFromEq);
				NewMap[X][Y] = math.clamp(Inv / EquatorAtY, 0, 1);
			}
		}
		return NewMap;
	}

	GenerateHeightmap (Z: number, Exponent: number): number[][]
	{
		print(Exponent);
		let Elevation: number[][] = [[]];
		for (let X = 0; X < this.Width; X++)
		{
			Elevation[X] = [];
			for (let Y = 0; Y < this.Height; Y++)
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
				let nx = X / this.Width - 0.5;
				let ny = Y / this.Height - 0.5;

				//let Noise = (math.noise(nx * Frequency, ny * Frequency, Z) + 0.5);
				let E0 = 1 * this.RidgedNoise(1 * nx, 1 * ny, Z);
				let E1 = 0.5 * this.RidgedNoise(2 * nx, 2 * ny, Z) * E0;
				let E2 = 0.25 * this.RidgedNoise(4 * nx, 4 * ny, Z) * E0;
				let E = (E0 + E1 + E2) / (1 + 0.5 + 0.25);
				E = math.pow(E, Exponent);
				Elevation[X][Y] = math.clamp(E, 0, 1);
			}
		}
		return Elevation;
	}
}