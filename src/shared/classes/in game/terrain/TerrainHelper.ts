import { AllBiomes, ModelSize } from "../../../consts/Biomes";
import { BiomeTypes } from "../../../consts/Enums";
import { CollisionCalculator } from "../../util/Collisions/CollisionCalculator";
import { ModelResizer } from "../../util/ModelResizer";
import { Sleep } from "../../util/Sleep";
import { Workers } from "../../util/Workers";
import { NoiseHelper } from "./NoiseHelper";
import { Biome } from "./specifics/biomes/Biome";
import { TerrainRequest } from "./specifics/regions/TerrainRequest";
import { TerrainResult } from "./specifics/regions/TerrainResult";

export class TerrainHelper
{
	static ModelsResized = false;

	constructor (Maps: TerrainRequest, AllBiomes: Biome[], FallbackBiome: Biome, RescaleModelsTo: number = ModelSize)
	{
		this.TerrainReq = Maps;
		if (!TerrainHelper.ModelsResized && game.GetService("RunService").IsServer())
		{
			TerrainHelper.ModelsResized = true;
			AllBiomes.forEach(B =>
			{
				B.RandomObjects.forEach(Obj =>
				{
					Obj.Model = ModelResizer.ScaleModel(Obj.Model, RescaleModelsTo);
				});
			});
		}
		this.XWidth = Maps.ElevationMap.Map.size();
		Maps.ElevationMap.Map.forEach(Arr =>
		{
			this.ZWidth++;
		});
		this.Biomes = AllBiomes;
		this.FallbackBiome = FallbackBiome;
		this.TempMap = NoiseHelper.GenerateTemperatureMap(Maps.ElevationMap.Height, Maps.ElevationMap.Width);
	}

	TerrainReq: TerrainRequest;

	XWidth: number = 0;
	ZWidth: number = 0;

	Biomes: Biome[];
	FallbackBiome: Biome;

	private TempMap: number[][];

	PaintObjectsByBiome (CurrentTerrain: TerrainResult[], WorkerCount: number)
	{

		let Threads: thread[] = [];
		for (let Index = 0; Index < CurrentTerrain.size(); Index += 50)
		{
			let Thread = coroutine.create(() =>
			{
				for (let ThisOffset = Index; ThisOffset < Index + 50 && ThisOffset < CurrentTerrain.size(); ThisOffset++)
				{
					let Terrain = CurrentTerrain[ThisOffset];

					let FakeElevation = this.TerrainReq.SizePerCell * (Terrain.Elevation * 40);
					let Siz = new Vector3(this.TerrainReq.SizePerCell, this.TerrainReq.SizePerCell * 2, this.TerrainReq.SizePerCell);
					let Pos = new Vector3((Terrain.X - this.XWidth / 2) * this.TerrainReq.SizePerCell, FakeElevation, (Terrain.Z - this.ZWidth / 2) * this.TerrainReq.SizePerCell);
					let Part = new Instance("Part", game.GetService("Workspace"));
					Part.Anchored = true;
					Part.Name = "TerrainPart";
					Part.Position = Pos;
					Part.Size = Siz;
					Part.CanCollide = false;
					Part.Transparency = 1;
					let Choice = new Random().NextNumber(0, 1);
					Terrain.Biome.RandomObjects.forEach(Obj =>
					{
						if (Choice > 0 && Obj.Model !== undefined)
						{
							let Clone = Obj.Model.Clone();
							Clone.Name = Obj.Model.Name;
							let Spawned = false;
							Choice -= (Obj.BiomesAndRarity.get(Terrain.Biome.BiomeEnum) ?? 0);
							if (Choice <= 0)
							{
								Clone.Parent = game.GetService("Workspace");
								let BaseE = (Terrain.Biome.MinimumElevation + Terrain.Biome.MaximumElevation);
								let MinElevation = BaseE * Obj.MinimumElevation;
								let MaxElevation = BaseE * Obj.MaximumElevation;
								let BaseM = (Terrain.Biome.MinimumMoisture + Terrain.Biome.MaximumMoisture);
								let MinM = BaseM * Obj.MinimumMoisture;
								let MaxM = BaseM * Obj.MaximumMoisture;
								let BaseT = (Terrain.Biome.MinimumTemp + Terrain.Biome.MaximumTemp);
								let MinT = BaseT * Obj.MinimumTemperature;
								let MaxT = BaseT * Obj.MaximumTemperature;
								if (MaxElevation >= Terrain.Elevation && MinElevation <= Terrain.Elevation &&
									MaxM >= Terrain.Moisture && MinM <= Terrain.Moisture &&
									MaxT >= Terrain.Temperature && MinT <= Terrain.Temperature)
								{
									let BoundingBox = Clone.GetExtentsSize();
									let TopOfPart = Part.Position.add(new Vector3(0, (Part.Size.Y / 2) + Obj.YOffset, 0));
									let BottomOfModel = BoundingBox.sub(new Vector3(0, BoundingBox.Y / 2, 0));
									let EndCFrame = new CFrame(TopOfPart.add(BottomOfModel));
									let ForgetAbout = Clone.GetChildren();
									ForgetAbout.push(Part);
									ForgetAbout.push(game.GetService("Workspace").Terrain);
									let Collision = CollisionCalculator.CalculateByBoundingBox(EndCFrame, BoundingBox, ForgetAbout);
									if (Collision.isEmpty())
									{
										Clone.SetPrimaryPartCFrame(EndCFrame/*.mul(CFrame.Angles(0, math.rad(math.random(-360, 360)), 0))*/);
										Obj.GeneratedByTerrain(Terrain, Clone);
										Spawned = true;
									}
								}
							}
							if (!Spawned)
							{
								Clone.Destroy();
							}
						}
					});
					Part.Destroy();
				}
			});
			Threads.push(Thread);
		}
		let ThreadHandler = new Workers(Threads);
		ThreadHandler.Split(WorkerCount);
	}

	FillTerrainByBiome (CurrentTerrain: TerrainResult[], WorkerCount: number)
	{
		let Threads: thread[] = [];
		for (let Index = 0; Index < CurrentTerrain.size(); Index += 50)
		{
			let Thread = coroutine.create(() =>
			{
				for (let ThisOffset = Index; ThisOffset < Index + 50 && ThisOffset < CurrentTerrain.size(); ThisOffset++)
				{
					let Terrain = CurrentTerrain[ThisOffset];

					let FakeElevation = this.TerrainReq.SizePerCell * (Terrain.Elevation * 40);

					let Siz = new Vector3(this.TerrainReq.SizePerCell, this.TerrainReq.SizePerCell * 2, this.TerrainReq.SizePerCell);
					let Pos = new Vector3((Terrain.X - this.XWidth / 2) * this.TerrainReq.SizePerCell, FakeElevation, (Terrain.Z - this.ZWidth / 2) * this.TerrainReq.SizePerCell);

					let Part = new Instance("Part", game.GetService("Workspace"));
					Part.Anchored = true;
					Part.Name = "TerrainPart";
					Part.Position = Pos;
					Part.Size = Siz;
					Part.CanCollide = false;
					Part.Transparency = 1;

					let BB = Terrain.Biome;
					Part.Size = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Size.X, this.TerrainReq.WaterHeightOffset, Part.Size.Z) : Part.Size;
					Part.Position = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Position.X, Part.Size.Y, Part.Position.Z) : Part.Position;
					game.GetService("Workspace").Terrain.FillBlock(Part.CFrame, Part.Size, BB.GroundMaterialDefault);
					//game.GetService("Workspace").Terrain.FillRegion(new Region3(Part.Position.div(2), Part.Size).ExpandToGrid(4), 4, BB.GroundMaterialDefault);
					Part.Destroy();
				}
			});
			Threads.push(Thread);
		}
		let ThreadHandler = new Workers(Threads);
		ThreadHandler.Split(WorkerCount);
		//game.GetService("Workspace").Terrain.FillCylinder(Part.CFrame, Part.Size.Y, Part.Size.X, Biome.GroundMaterialDefault);
	}

	GetTerrain (Xp: number, Zp: number, Xpt: number, Zpt: number): TerrainResult[]
	{
		let T: TerrainResult[] = [];
		print(Xp);
		for (let X = Xp; X < this.XWidth && X < Xpt; X++)
		{
			for (let Z = Zp; Z < this.ZWidth && Z < Zpt; Z++)
			{
				let TR: TerrainResult | undefined = undefined;
				let Elevation = this.TerrainReq.ElevationMap.Map[X][Z];
				let Moisture = this.TerrainReq.MoistureMap.Map[X][Z];
				let Temperature = this.TempMap[X][Z];
				let RCFrame = CFrame.Angles(0, math.rad(math.random(-360, 360)), 0);

				let BiomeFilled = false;
				this.Biomes.forEach(B =>
				{
					if (!BiomeFilled && B.MinimumElevation <= Elevation && B.MinimumTemp <= Temperature && B.MinimumMoisture <= Moisture && B.MaximumElevation >= Elevation && B.MaximumTemp >= Temperature && B.MaximumMoisture >= Moisture)
					{
						BiomeFilled = true;
						TR = new TerrainResult(Elevation, Moisture, Temperature, X, Z, B, RCFrame, this.TerrainReq.WaterHeightOffset);
					}
				});

				if (!BiomeFilled && this.FallbackBiome !== undefined)
				{
					TR = new TerrainResult(Elevation, Moisture, Temperature, X, Z, this.FallbackBiome, RCFrame, this.TerrainReq.WaterHeightOffset);
				}

				if (TR !== undefined)
				{
					T.push(TR);
				}
			}
		}
		return T;
	}
}