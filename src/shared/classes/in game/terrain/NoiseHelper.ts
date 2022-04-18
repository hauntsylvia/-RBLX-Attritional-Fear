export class NoiseHelper
{
	constructor (Height: number, Width: number)
	{
		this.Height = Height;
		this.Width = Width;
	}

	Height: number;
	Width: number;

	GenerateHeightmap (Z: number, Frequency: number): number[][]
	{
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

				let Noise = (math.noise(nx * Frequency, ny * Frequency, Z) + 0.5);

				Elevation[X][Y] = math.clamp(Noise, 0, 1);
			}
		}
		return Elevation;
	}
}