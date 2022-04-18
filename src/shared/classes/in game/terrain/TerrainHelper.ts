import { CollisionCalculator } from "../../util/Collisions/CollisionCalculator";
import { NoiseHelper } from "./NoiseHelper";
import { Biome } from "./specifics/biomes/Biome";

export class TerrainHelper
{
	constructor ()
	{

	}

	private FillSpotByBiome (Part: Part, Biome: Biome)
	{
		game.GetService("Workspace").Terrain.FillBlock(Part.CFrame, Part.Size, Biome.GroundMaterialDefault);
		Biome.RandomObjects.forEach(Obj =>
		{
			let TotalChance = Obj.BiomesAndRarity.get(Biome.BiomeEnum) ?? 0;
			let RNG = new Random().NextNumber(0, 1) + TotalChance > 1;
			if (RNG && Obj.Model !== undefined)
			{
				let BoundingBox = Obj.Model.GetExtentsSize();
				let TopOfPart = Part.Position.add(new Vector3(0, (Part.Size.Y / 2) + Obj.YOffset, 0));
				let BottomOfModel = BoundingBox.sub(new Vector3(0, BoundingBox.Y / 2, 0));
				let EndCFrame = new CFrame(TopOfPart.add(BottomOfModel)).mul(CFrame.Angles(0, math.rad(math.random(-90, 90)), 0));
				let ForgetAbout = Obj.Model.GetChildren();
				ForgetAbout.push(Part);
				ForgetAbout.push(game.GetService("Workspace").Terrain);
				let Collision = CollisionCalculator.CalculateByBoundingBox(EndCFrame, BoundingBox, ForgetAbout);
				if (Collision.size() === 0)
				{
					let Clone = Obj.Model.Clone();
					Clone.Name = "Clone";
					Clone.Parent = game.GetService("Workspace");
					Clone.SetPrimaryPartCFrame(EndCFrame);
				}
				else
				{
				}
			}
		});
	}

	Connect (AllBiomes: Biome[])
	{
		let Noise = new NoiseHelper(200, 200, 5);
		let HeightMap = Noise.GenerateHeightmap(math.random(1, 10e6));
		let MoistureMap = Noise.GenerateHeightmap(math.random(1, 10e6));
		for (let X = 0; X < Noise.Height; X++)
		{
			let C = coroutine.create(() =>
			{
				for (let Z = 0; Z < Noise.Width; Z++)
				{
					let Elevation = HeightMap[X][Z];
					let Moisture = MoistureMap[X][Z];

					let Siz = new Vector3(5, Elevation * 40, 5);
					let Pos = new Vector3((X - Noise.Height / 2) * 5, Siz.Y / 2, (Z - Noise.Width / 2) * 5);
					//print(Heightmap[X][Z]);
					let Part = new Instance("Part", game.GetService("Workspace"));
					Part.Anchored = true;
					Part.Name = "TerrainPart";
					Part.Position = Pos;
					Part.Size = Siz;
					Part.CanCollide = false;
					Part.Transparency = 1;
					wait();

					AllBiomes.forEach(B =>
					{
						if (B.MinimumElevation <= Elevation)
						{
							this.FillSpotByBiome(Part, B);
						}
						else
						{
							print(Elevation);
						}
					});

					Part.Destroy();
				}
			});
			coroutine.resume(C);
		}
	}
}