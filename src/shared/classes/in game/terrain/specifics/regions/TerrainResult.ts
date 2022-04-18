export class TerrainResult
{
	constructor (Elevation: number, Moisture: number, Temperature: number)
	{
		this.Elevation = Elevation;
		this.Moisture = Moisture;
		this.Temperature = Temperature;
	}

	Elevation: number;
	Moisture: number;
	Temperature: number;
}