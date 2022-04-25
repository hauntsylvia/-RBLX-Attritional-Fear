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

	constructor (Maps: TerrainRequest, AllBiomes: Biome[], FallbackBiome: Biome, RescaleModelsTo: number = ModelSize, Sleeper: Sleep)
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
		this.XWidth = Maps.ElevationMap.Height;
		this.ZWidth = Maps.ElevationMap.Width
		this.Biomes = AllBiomes;
		this.FallbackBiome = FallbackBiome;
		this.TempMap = NoiseHelper.GenerateTemperatureMap(Maps.ElevationMap.Height, Maps.ElevationMap.Width, Sleeper);
	}

	TerrainReq: TerrainRequest;

	XWidth: number = 0;
	ZWidth: number = 0; // because for this width we count the number of arrays, and arrays r indexed by 0 not 1 (# elements - 1)

	Biomes: Biome[];
	FallbackBiome: Biome;

	private TempMap: number[][];

	FrameSteps: number = 5;

	PaintObjectsByBiome (CurrentTerrain: TerrainResult[])
	{
		let Stepper = new Sleep(200);
		for (let ThisOffset = 0; ThisOffset < CurrentTerrain.size(); ThisOffset++)
		{
			let Terrain = CurrentTerrain[ThisOffset];
			//this.AlreadyRendered.push(new Vector2(Terrain.X, Terrain.Z));
			if (Terrain.SpawnModelAt !== undefined && Terrain.ModelToSpawnHere !== undefined && Terrain.ModelToSpawnHere.Model !== undefined)
			{
				let Clone = Terrain.ModelToSpawnHere.Model.Clone();

				let ForgetAbout = Terrain.ModelToSpawnHere.Model.GetChildren();
				ForgetAbout.push(game.GetService("Workspace").Terrain);
				let Collision = CollisionCalculator.CalculateByBoundingBox(Terrain.SpawnModelAt, Terrain.ModelToSpawnHere.Model.GetExtentsSize(), ForgetAbout);
				if (Collision.isEmpty())
				{
					Clone.Parent = game.GetService("Workspace");
					Terrain.ModelToSpawnHere.GeneratedByTerrain(Terrain, Clone);
					Clone.SetPrimaryPartCFrame(Terrain.SpawnModelAt.mul(CFrame.Angles(0, math.rad(math.random(-360, 360)), 0)));
				}
				else
				{
					Clone.Destroy();
				}
			}
			Stepper.Step();
		}
	}

	ModifyTerrainWithObjects (CurrentTerrain: TerrainResult[])
	{
		for (let ThisOffset = 0; ThisOffset < CurrentTerrain.size(); ThisOffset++)
		{
			let Terrain = CurrentTerrain[ThisOffset];
			let Choice = new Random().NextNumber(0, 1);
			Terrain.Biome.RandomObjects.forEach(Obj =>
			{
				if (Choice > 0 && Obj.Model !== undefined)
				{
					Choice -= (Obj.BiomesAndRarity.get(Terrain.Biome.BiomeEnum) ?? 0);
					if (Choice <= 0)
					{
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

							let BoundingBox = Obj.Model.GetExtentsSize();
							let TopOfPart = Terrain.RealPosition.Position.add(new Vector3(0, ((this.TerrainReq.SizePerCell * 2) / 2) + Obj.YOffset, 0));
							let BottomOfModel = BoundingBox.sub(new Vector3(0, BoundingBox.Y / 2, 0));
							let EndCFrame = new CFrame(TopOfPart.add(BottomOfModel));
							Terrain.ModelToSpawnHere = Obj;
							Terrain.SpawnModelAt = EndCFrame;
						}
					}
				}
			});
		}
	}

	GetThreadsForTerrainFilling (CurrentTerrain: TerrainResult[]): thread[]
	{
		let Threads: thread[] = [];
		for (let Index = 0; Index < CurrentTerrain.size(); Index += 50)
		{
			let Thread = coroutine.create(() =>
			{
				let Sleeper = new Sleep(1);
				for (let ThisOffset = Index; ThisOffset < Index + 50 && ThisOffset < CurrentTerrain.size(); ThisOffset++)
				{
					Sleeper.Step();
					let Terrain = CurrentTerrain[ThisOffset];

					let FakeElevation = this.TerrainReq.SizePerCell * (Terrain.Elevation * 40);

					let Pos = new Vector3(Terrain.RealPosition.X, FakeElevation, Terrain.RealPosition.Z);
					let Siz = new Vector3(this.TerrainReq.SizePerCell, this.TerrainReq.SizePerCell * 2, this.TerrainReq.SizePerCell);

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
						//this.AlreadyRendered.push(new Vector2(Terrain.X, Terrain.Z));
				}
			});
			Threads.push(Thread);
		}
		return Threads;
		//game.GetService("Workspace").Terrain.FillCylinder(Part.CFrame, Part.Size.Y, Part.Size.X, Biome.GroundMaterialDefault);
	}

	// The coords of the heightmap are 0 to width. The coords of the map in real world space are subtracted by half the width to offset it
	// to the center of the real world space.
	GetTerrain (Xp: number, Zp: number, Xpt: number, Zpt: number): TerrainResult[]
	{
		let Stepper = new Sleep(7000);
		let T: TerrainResult[] = [];
		let OffsetXWidthMin = -(this.XWidth / 2);
		let OffsetXWidthMax = (this.XWidth / 2);

		let OffsetZWidthMin = -(this.ZWidth / 2);
		let OffsetZWidthMax = (this.ZWidth / 2);

		Xp = Xp < OffsetXWidthMin ? OffsetXWidthMin : Xp;
		Zp = Zp < OffsetZWidthMin ? OffsetZWidthMin : Zp;
		Xpt = Xpt > OffsetXWidthMax ? OffsetXWidthMax : Xpt;
		Zpt = Zpt > OffsetZWidthMax ? OffsetZWidthMax : Zpt;

		for (let RealWorldRequestedX = Xp; RealWorldRequestedX < OffsetXWidthMax && RealWorldRequestedX >= OffsetXWidthMin && RealWorldRequestedX < Xpt; RealWorldRequestedX++)
		{
			let NormalX = RealWorldRequestedX + this.XWidth / 2; // -100 + (1200 / 2) = 500 (client wants a little left-center of map in real world coords)
			for (let RealWorldRequestedZ = Zp; RealWorldRequestedZ < OffsetZWidthMax && RealWorldRequestedZ >= OffsetZWidthMin && RealWorldRequestedZ < Zpt; RealWorldRequestedZ++)
			{
				let NormalZ = RealWorldRequestedZ + this.ZWidth / 2;
				let TR: TerrainResult | undefined = undefined;
				let Elevation = this.TerrainReq.ElevationMap.Map[NormalX][NormalZ];
				let FakeElevation = this.TerrainReq.SizePerCell * (Elevation * 40);
				let Moisture = this.TerrainReq.MoistureMap.Map[NormalX][NormalZ];
				let Temperature = this.TempMap[NormalX][NormalZ];

				let Pos = new CFrame(RealWorldRequestedX * this.TerrainReq.SizePerCell, FakeElevation, RealWorldRequestedZ * this.TerrainReq.SizePerCell);

				let BiomeFilled = false;
				this.Biomes.forEach(B =>
				{
					if (!BiomeFilled && B.MinimumElevation <= Elevation && B.MinimumTemp <= Temperature && B.MinimumMoisture <= Moisture && B.MaximumElevation >= Elevation && B.MaximumTemp >= Temperature && B.MaximumMoisture >= Moisture)
					{
						BiomeFilled = true;
						TR = new TerrainResult(Pos, Elevation, Moisture, Temperature, RealWorldRequestedX, RealWorldRequestedZ, B, this.TerrainReq.WaterHeightOffset);
					}
				});

				if (!BiomeFilled && this.FallbackBiome !== undefined)
				{
					TR = new TerrainResult(Pos, Elevation, Moisture, Temperature, RealWorldRequestedX, RealWorldRequestedZ, this.FallbackBiome, this.TerrainReq.WaterHeightOffset);
				}


				if (TR !== undefined)
				{
					Stepper.Step();
					T.push(TR);
				}
			}
		}
		if (game.GetService("RunService").IsServer())
		{
			this.ModifyTerrainWithObjects(T);
		}
		return T;
	}
}