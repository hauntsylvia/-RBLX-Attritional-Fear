export class TerrainRegion
{
	constructor (MaximumTemp: number, MinimumTemp: number)
	{
		this.MaximumTemp = MaximumTemp;
		this.MinimumTemp = MinimumTemp;
	}

	MaximumTemp: number;
	MinimumTemp: number;

	ResolveAdjacentRegion (R: TerrainRegion)
	{

	}
}