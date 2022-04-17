import { NoiseHelper } from "./NoiseHelper";

export class TerrainHelper
{
	constructor ()
	{

	}

	Connect ()
	{
		let Height = new NoiseHelper(200, 200, 5);
		let Moisture = new NoiseHelper(200, 200, 2);
		let HeightMap = Height.GenerateHeightmap(math.random(1, 10e6));
		let MoistureMap = Moisture.GenerateHeightmap(math.random(1, 10e6));
		for (let X = 0; X < Height.Height; X++)
		{
			let C = coroutine.create(() =>
			{
				for (let Z = 0; Z < Height.Width; Z++)
				{
					let Siz = new Vector3(5, HeightMap[X][Z] * 40, 5);
					let Pos = new Vector3((X - Height.Height / 2) * 5, 20 + Siz.Y / 2, (Z - Height.Height / 2) * 5);
					//print(Heightmap[X][Z]);
					let Part = new Instance("Part", game.GetService("Workspace"));
					Part.Anchored = true;
					Part.Name = "B";
					Part.Position = Pos;
					Part.Size = Siz;
					Part.CanCollide = false;
					wait();
				}
			});
			coroutine.resume(C);
		}
	}
}