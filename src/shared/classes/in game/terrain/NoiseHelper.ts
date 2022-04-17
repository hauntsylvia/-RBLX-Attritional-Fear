export class NoiseHelper
{
	constructor (Height: number, Width: number, Frequency: number)
	{
		this.Height = Height;
		this.Width = Width;
		this.Frequency = Frequency;
	}

	Height: number;
	Width: number;
	Frequency: number;

	GenerateHeightmap (Z: number): number[][]
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
				let Noise = math.noise(nx * this.Frequency, ny * this.Frequency, Z);
				Elevation[X][Y] = Noise + 0.5;
			}
		}
		return Elevation;
	}
}