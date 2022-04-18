import { Biomes } from "../../../consts/Enums";
import { CollisionCalculator } from "../../util/Collisions/CollisionCalculator";
import { NoiseHelper } from "./NoiseHelper";
import { Biome } from "./specifics/biomes/Biome";
import { TerrainResult } from "./specifics/regions/TerrainResult";

export class TerrainHelper
{
	constructor (SizePerCell: number)
	{
		this.SizePerCell = SizePerCell;
	}

	SizePerCell: number;

	private FillSpotByBiome (Part: Part, CurrentTerrain: TerrainResult, WaterHeight: number, Biome: Biome)
	{
		Part.Size = Biome.BiomeEnum === Biomes.Ocean ? new Vector3(Part.Size.X, 2, Part.Size.Z) : Part.Size;
		Part.Position = Biome.BiomeEnum === Biomes.Ocean ? new Vector3(Part.Position.X, WaterHeight, Part.Position.Z) : Part.Position;
		if (Biome.BiomeEnum === Biomes.Beach)
		{
			print(Part.Size);
		}
		game.GetService("Workspace").Terrain.FillBlock(Part.CFrame, Part.Size, Biome.GroundMaterialDefault);
		let C = coroutine.create(() =>
		{
			Biome.RandomObjects.forEach(Obj =>
			{
				let BaseE = (Biome.MinimumElevation + Biome.MaximumElevation);
				let MinElevation = BaseE * Obj.MinimumElevation;
				let MaxElevation = BaseE * Obj.MaximumElevation;
				let BaseM = (Biome.MinimumMoisture + Biome.MaximumMoisture);
				let MinM = BaseM * Obj.MinimumMoisture;
				let MaxM = BaseM * Obj.MaximumMoisture;
				let BaseT = (Biome.MinimumTemp + Biome.MaximumTemp);
				let MinT = BaseT * Obj.MinimumTemperature;
				let MaxT = BaseT * Obj.MaximumTemperature;
				if (MaxElevation >= CurrentTerrain.Elevation && MinElevation <= CurrentTerrain.Elevation &&
					MaxM >= CurrentTerrain.Moisture && MinM <= CurrentTerrain.Moisture &&
					MaxT >= CurrentTerrain.Temperature && MinT <= CurrentTerrain.Temperature)
				{
					let BoundingBox = Obj.Model.GetExtentsSize();
					let TopOfPart = Part.Position.add(new Vector3(0, (Part.Size.Y / 2) + Obj.YOffset, 0));
					let BottomOfModel = BoundingBox.sub(new Vector3(0, BoundingBox.Y / 2, 0));
					let EndCFrame = new CFrame(TopOfPart.add(BottomOfModel)).mul(CFrame.Angles(0, math.rad(math.random(-90, 90)), 0));
					let ForgetAbout = Obj.Model.GetChildren();
					ForgetAbout.push(Part);
					ForgetAbout.push(game.GetService("Workspace").Terrain);
					let Collision = CollisionCalculator.CalculateByBoundingBox(EndCFrame, BoundingBox, ForgetAbout);
					if (Collision.isEmpty())
					{
						let Chance = Obj.BiomesAndRarity.get(Biome.BiomeEnum);
						let PaddedChance = Chance !== undefined ? Chance / 4 : 0;
						let RNG = new Random().NextNumber(0, 1) + PaddedChance;
						if (RNG > 1 && Obj.Model !== undefined)
						{
							let Clone = Obj.Model.Clone();
							Clone.Name = "Clone";
							Clone.Parent = game.GetService("Workspace");
							Clone.SetPrimaryPartCFrame(EndCFrame);
						}
					}
				}
			});
		});
		coroutine.resume(C);
	}

	Connect (WaterHeight: number, AllBiomes: Biome[], FallbackBiome?: Biome)
	{
		let Noise = new NoiseHelper(200, 200);
		let HeightMap = Noise.GenerateHeightmap(math.random(1, 10e6), 7);
		let MoistureMap = Noise.GenerateHeightmap(math.random(1, 10e6), 7);
		let TemperatureMap = Noise.GenerateHeightmap(math.random(1, 10e6), 1);
		for (let X = 0; X < Noise.Height; X++)
		{
			let C = coroutine.create(() =>
			{
				for (let Z = 0; Z < Noise.Width; Z++)
				{
					let Elevation = HeightMap[X][Z];
					let Moisture = MoistureMap[X][Z];
					let Temperature = TemperatureMap[X][Z];

					let Siz = new Vector3(this.SizePerCell, Elevation * 40, this.SizePerCell);
					let Pos = new Vector3((X - Noise.Height / 2) * this.SizePerCell, Siz.Y / 2, (Z - Noise.Width / 2) * this.SizePerCell);
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
						if (B.MinimumElevation <= Elevation && B.MinimumTemp <= Temperature && B.MinimumMoisture <= Moisture && B.MaximumElevation >= Elevation && B.MaximumTemp >= Temperature && B.MaximumMoisture >= Moisture)
						{
							this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature), WaterHeight, B);
						}
						else if (FallbackBiome !== undefined)
						{
							this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature), WaterHeight, FallbackBiome);
						}
						else
						{
							print("Mins  " + (B.MinimumElevation <= Elevation && B.MinimumTemp <= Temperature && B.MinimumMoisture <= Moisture));
							print("Maxes " + (B.MaximumElevation >= Elevation && B.MaximumTemp >= Temperature && B.MaximumMoisture >= Moisture));
						}
					});

					Part.Destroy();
				}
			});
			coroutine.resume(C);
		}
	}
}