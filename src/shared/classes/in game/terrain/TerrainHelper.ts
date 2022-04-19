import { BiomeTypes } from "../../../consts/Enums";
import { CollisionCalculator } from "../../util/Collisions/CollisionCalculator";
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
		this.WaterHeight = Maps.WaterHeight;

		this.ElevationMap = Maps.ElevationMap;
		this.MoistureMap = Maps.MoistureMap;
		this.TempMap = Maps.TempMap;

		this.XWidth = this.ElevationMap.size();
		this.ElevationMap.forEach(Arr =>
		{
			this.ZWidth++;
		});
	}

	TerrainReq: TerrainRequest;

	SizePerCell: number;
	WaterHeight: number;

	XWidth: number = 0;
	ZWidth: number = 0;

	private ElevationMap: number[][];
	private MoistureMap: number[][];
	private TempMap: number[][];

	private FillSpotByBiome (Part: Part, CurrentTerrain: TerrainResult, WaterHeight: number)
	{
		let BB = CurrentTerrain.Biome;
		Part.Size = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Size.X, 2, Part.Size.Z) : Part.Size;
		Part.Position = BB.BiomeEnum === BiomeTypes.Ocean ? new Vector3(Part.Position.X, WaterHeight, Part.Position.Z) : Part.Position;
		game.GetService("Workspace").Terrain.FillBlock(Part.CFrame, Part.Size, BB.GroundMaterialDefault);
		//game.GetService("Workspace").Terrain.FillCylinder(Part.CFrame, Part.Size.Y, Part.Size.X, Biome.GroundMaterialDefault);
		let C = coroutine.create(() =>
		{
			let Choice = new Random().NextNumber(0, 1 * this.SizePerCell);
			BB.RandomObjects.forEach(Obj =>
			{
				if (Choice > 0)
				{
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
						let BoundingBox = Obj.Model.GetExtentsSize();
						let TopOfPart = Part.Position.add(new Vector3(0, (Part.Size.Y / 2) + Obj.YOffset, 0));
						let BottomOfModel = BoundingBox.sub(new Vector3(0, BoundingBox.Y / 2, 0));
						let EndCFrame = new CFrame(TopOfPart.add(BottomOfModel));
						let ForgetAbout = Obj.Model.GetChildren();
						ForgetAbout.push(Part);
						ForgetAbout.push(game.GetService("Workspace").Terrain);
						let Collision = CollisionCalculator.CalculateByBoundingBox(EndCFrame, BoundingBox, ForgetAbout);
						if (Collision.isEmpty())
						{
							Choice -= Obj.BiomesAndRarity.get(BB.BiomeEnum) ?? 1;
							if (Choice <= 0 && Obj.Model !== undefined)
							{
								let Clone = Obj.Model.Clone();
								Clone.Name = Obj.Model.Name;
								Clone.Parent = game.GetService("Workspace");
								Clone.SetPrimaryPartCFrame(EndCFrame);
								Obj.GeneratedByTerrain(CurrentTerrain, Clone);
							}
						}
					}
				}
			});
		});
		coroutine.resume(C);
	}

	Render (Xp: number, Zp: number, Xpt: number, Zpt: number, AllBiomes: Biome[], FallbackBiome: Biome)
	{
		for (let X = Xp; X < this.XWidth && X < Xpt; X++)
		{
			Sleep.W(0.2);
			let C = coroutine.create(() =>
			{
				for (let Z = Zp; Z < this.ZWidth && Z < Zpt; Z++)
				{
					let Elevation = this.ElevationMap[X][Z];
					let Moisture = this.MoistureMap[X][Z];
					let Temperature = this.TempMap[X][Z];
					let Siz = new Vector3(this.SizePerCell, this.SizePerCell, this.SizePerCell);
					let Pos = new Vector3((X) * this.SizePerCell, this.SizePerCell * (Elevation * 20), (Z) * this.SizePerCell);
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
							this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature, B), this.WaterHeight);
						}
					});

					
					if (!BiomeFilled && FallbackBiome !== undefined)
					{
						this.FillSpotByBiome(Part, new TerrainResult(Elevation, Moisture, Temperature, FallbackBiome), this.WaterHeight);
					}

					Sleep.W(0.1);
					Part.Destroy();
				}
			});
			coroutine.resume(C);
		}
	}
}