import { BiomeTypes } from "../../../consts/Enums";
import { CollisionCalculator } from "../../util/Collisions/CollisionCalculator";
import { ModelResizer } from "../../util/ModelResizer";
import { Sleep } from "../../util/Sleep";
import { NoiseHelper } from "./NoiseHelper";
import { Biome } from "./specifics/biomes/Biome";
import { TerrainRequest } from "./specifics/regions/TerrainRequest";
import { TerrainResult } from "./specifics/regions/TerrainResult";

export class TerrainHelper
{
	constructor (Maps: TerrainRequest)
	{
		this.TerrainReq = Maps;

		this.SizePerCell = Maps.SizePerCell;
		this.WaterHeightOffset = Maps.WaterHeightOffset;

		this.ElevationMap = Maps.ElevationMap;
		this.MoistureMap = Maps.MoistureMap;
		this.TempMap = Maps.ElevationMap.GenerateTemperatureMap();

		this.XWidth = this.ElevationMap.Map.size();
		this.ElevationMap.Map.forEach(Arr =>
		{
			this.ZWidth++;
		});
	}

	TerrainReq: TerrainRequest;

	SizePerCell: number;
	WaterHeightOffset: number;

	XWidth: number = 0;
	ZWidth: number = 0;

	private ElevationMap: NoiseHelper;
	private MoistureMap: NoiseHelper;
	private TempMap: number[][];

	private FillSpotByBiome (Part: Part, CurrentTerrain: TerrainResult, WaterHeightOffset: number)
	{
		let BB = CurrentTerrain.Biome;
		Part.Size = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Size.X, WaterHeightOffset, Part.Size.Z) : Part.Size;
		Part.Position = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Position.X, Part.Size.Y, Part.Position.Z) : Part.Position;
		game.GetService("Workspace").Terrain.FillBlock(Part.CFrame, Part.Size, BB.GroundMaterialDefault);
		//game.GetService("Workspace").Terrain.FillCylinder(Part.CFrame, Part.Size.Y, Part.Size.X, Biome.GroundMaterialDefault);
		let C = coroutine.create(() =>
		{
			let Choice = new Random().NextNumber(0, 5);
			BB.RandomObjects.forEach(Obj =>
			{
				if (Choice > 0 && Obj.Model !== undefined)
				{
					let Clone = Obj.Model.Clone();
					Clone.Name = Obj.Model.Name;

					let Spawned = false;
					let BaseE = (BB.MinimumElevation + BB.MaximumElevation);
					let MinElevation = BaseE * Obj.MinimumElevation;
					let MaxElevation = BaseE * Obj.MaximumElevation;
					let BaseM = (BB.MinimumMoisture + BB.MaximumMoisture);
					let MinM = BaseM * Obj.MinimumMoisture;
					let MaxM = BaseM * Obj.MaximumMoisture;
					let BaseT = (BB.MinimumTemp + BB.MaximumTemp);
					let MinT = BaseT * Obj.MinimumTemperature;
					let MaxT = BaseT * Obj.MaximumTemperature;
					if (MaxElevation >= CurrentTerrain.Elevation && MinElevation <= CurrentTerrain.Elevation &&
						MaxM >= CurrentTerrain.Moisture && MinM <= CurrentTerrain.Moisture &&
						MaxT >= CurrentTerrain.Temperature && MinT <= CurrentTerrain.Temperature)
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
							Choice -= (Obj.BiomesAndRarity.get(BB.BiomeEnum) ?? 0) * this.SizePerCell;
							if (Choice <= 0)
							{
								Obj.GeneratedByTerrain(CurrentTerrain, Clone);
								Clone.Parent = game.GetService("Workspace");
								Spawned = true;
								Clone.Parent = game.GetService("Workspace");
								Clone.SetPrimaryPartCFrame(EndCFrame/*.mul(CFrame.Angles(0, math.rad(math.random(-360, 360)), 0))*/);
							}
						}
					}

					if (!Spawned)
					{
						Clone.Destroy();
					}
					
				}
			});
		});
		coroutine.resume(C);
	}

	Render (Xp: number, Zp: number, Xpt: number, Zpt: number, AllBiomes: Biome[], FallbackBiome: Biome, RescaleModelsTo: number = 0.8)
	{
		print(Xp);
		AllBiomes.forEach(B =>
		{
			B.RandomObjects.forEach(Obj =>
			{
				Obj.Model = ModelResizer.ScaleModel(Obj.Model, RescaleModelsTo);
			});
		});
		for (let X = Xp; X < this.XWidth && X < Xpt; X++)
		{
			let C = coroutine.create(() =>
			{
				for (let Z = Zp; Z < this.ZWidth && Z < Zpt; Z++)
				{
					let Elevation = this.ElevationMap.Map[X][Z];
					let FakeElevation = this.SizePerCell * (Elevation * 40);
					let Moisture = this.MoistureMap.Map[X][Z];
					let Temperature = this.TempMap[X][Z];
					let Siz = new Vector3(this.SizePerCell, this.SizePerCell * 2, this.SizePerCell);
					let Pos = new Vector3((X - this.XWidth / 2) * this.SizePerCell, FakeElevation, (Z - this.ZWidth / 2) * this.SizePerCell);
					let Part = new Instance("Part", game.GetService("Workspace"));
					Part.Anchored = true;
					Part.Name = "TerrainPart";
					Part.Position = Pos;
					Part.Size = Siz;
					Part.CanCollide = false;
					Part.Transparency = 1;
					
					let BiomeFilled = false;

					AllBiomes.forEach(B =>
					{
						if (!BiomeFilled && B.MinimumElevation <= Elevation && B.MinimumTemp <= Temperature && B.MinimumMoisture <= Moisture && B.MaximumElevation >= Elevation && B.MaximumTemp >= Temperature && B.MaximumMoisture >= Moisture)
						{
							BiomeFilled = true;
							this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature, X, Z, B), this.WaterHeightOffset);
						}
					});

					
					if (!BiomeFilled && FallbackBiome !== undefined)
					{
						this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature, X, Z, FallbackBiome), this.WaterHeightOffset);
					}

					wait();
					Part.Destroy();
				}
			});
			coroutine.resume(C);
			wait();
		}
	}
}