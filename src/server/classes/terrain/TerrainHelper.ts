import { NoiseHelper } from "./NoiseHelper";

export class TerrainHelper
{
	constructor ()
	{

	}

	Connect ()
	{
		let TG = new NoiseHelper(100, 100, 0.2);
		let Heightmap = TG.GenerateHeightmap(512);
		for (let X = 0; X < TG.Width; X++)
		{
			for (let Z = 0; Z < TG.Width; Z++)
			{
				let Pos = new Vector3(X * 5, 30, Z * 5);
				let Siz = new Vector3(5, Heightmap[X][Z] * 50, 5);
				let Part = new Instance("Part", game.GetService("Workspace"));
				Part.Anchored = true;
				Part.Name = "B";
				Part.Position = Pos;
				Part.Size = Siz;
				Part.CanCollide = false;
				wait();
			}
		}
	}
}