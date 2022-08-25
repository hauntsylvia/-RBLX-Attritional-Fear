import { AllBiomes, MaxModelSize, MinimumModelSize } from "../../../consts/Biomes";
import { BiomeType } from "../../../consts/Enums";
import { SNumbers } from "../../../consts/SNumbers";
import { CollisionCalculator } from "../../util/collisions/CollisionCalculator";
import { ModelResizer } from "../../util/ModelResizer";
import { Sleep } from "../../util/Sleep";
import { Workers } from "../../util/Workers";
import { NoiseHelper } from "./NoiseHelper";
import { Biome } from "./specifics/biomes/Biome";
import { TerrainRequest } from "./specifics/regions/TerrainRequest";
import { TerrainResult } from "./specifics/regions/TerrainResult";

export class TerrainHelper
{
	constructor (Maps: TerrainRequest, AllBiomes: Biome[], FallbackBiome: Biome, RescaleModelsToMax: number = MaxModelSize, RescaleModelsToMin: number = MinimumModelSize)
	{
		this.TerrainReq = Maps;
		this.Biomes = AllBiomes;
		this.FallbackBiome = FallbackBiome;
		this.RescaleModelsToMax = RescaleModelsToMax;
		this.RescaleModelsToMin = RescaleModelsToMin;
	}

	RescaleModelsToMax: number = MaxModelSize;
	RescaleModelsToMin: number = MinimumModelSize;

	TerrainReq: TerrainRequest;
	Biomes: Biome[];
	FallbackBiome: Biome;

	private AlreadyPainted: TerrainResult[] = [];
	private AlreadyRendered: TerrainResult[] = [];

	private static ModelsResized = false;
	private static Workspace = game.GetService("Workspace");

	private Random = new Random();

	public PaintObjectsByBiome (CurrentTerrain: TerrainResult[])
	{
		const Stepper = new Sleep(200);
		print(`CurrentTerrain size: ${CurrentTerrain.size()}.`);
		if (CurrentTerrain.size() <= 0)
		{
			print(`CurrentTerrain size is 0. There's no terrain present!`);
		}
		for (let ThisOffset = 0; ThisOffset < CurrentTerrain.size(); ThisOffset++)
		{
			const Terrain = CurrentTerrain[ThisOffset];
			if ((!this.AlreadyPainted.some(T => T.X === Terrain.X && T.Z === Terrain.Z)))
			{
				this.AlreadyPainted.push(Terrain);
				if (Terrain.SpawnModelAt !== undefined && Terrain.ModelToSpawnHere !== undefined && Terrain.ModelToSpawnHere.Model !== undefined)
				{
					for (let SpecificPointX = 0; SpecificPointX < SNumbers.Terrain.SizePerCell; SpecificPointX = SpecificPointX + Terrain.ModelToSpawnHere.Density)
					{
						for (let SpecificPointZ = 0; SpecificPointZ < SNumbers.Terrain.SizePerCell; SpecificPointZ = SpecificPointZ + Terrain.ModelToSpawnHere.Density)
						{
							let NewPoint = Terrain.SpawnModelAt.add(new Vector3(SpecificPointX, 0, SpecificPointZ)).mul(CFrame.Angles(0, math.rad(math.random(-360, 360)), 0));
							let Clone = Terrain.ModelToSpawnHere.Model.Clone();
							if (!TerrainHelper.ModelsResized && game.GetService("RunService").IsServer())
							{
								TerrainHelper.ModelsResized = true;
								Clone = ModelResizer.ScaleModel(Clone, this.Random.NextNumber(this.RescaleModelsToMin, this.RescaleModelsToMax));
							}


							const ForgetAbout = Terrain.ModelToSpawnHere.Model.GetChildren();
							ForgetAbout.push(TerrainHelper.Workspace.Terrain);
							const Collision = CollisionCalculator.CalculateByBoundingBox(NewPoint, Terrain.ModelToSpawnHere.Model.GetExtentsSize(), ForgetAbout);

							if (Collision.isEmpty())
							{
								Clone.Parent = TerrainHelper.Workspace;
								Terrain.ModelToSpawnHere.GeneratedByTerrain(Terrain, Clone);
								Clone.SetPrimaryPartCFrame(NewPoint);
							}
							else
							{
								Clone.Destroy();
							}

							Stepper.Step();
						}
					}
				}
			}
		}
	}

	private ModifyTerrainWithObjects (CurrentTerrain: TerrainResult[]): TerrainResult[]
	{
		const RayP = new RaycastParams();
		RayP.FilterType = Enum.RaycastFilterType.Whitelist;
		RayP.FilterDescendantsInstances.push(TerrainHelper.Workspace.Terrain);
		for (let ThisOffset = 0; ThisOffset < CurrentTerrain.size(); ThisOffset++)
		{
			const Terrain = CurrentTerrain[ThisOffset];
			let Choice = new Random().NextNumber(0, 1);
			Terrain.Biome.RandomObjects.forEach(Obj =>
			{
				if (Choice > 0 && Obj.Model !== undefined)
				{
					Choice -= (Obj.BiomesAndRarity.get(Terrain.Biome.BiomeEnum) ?? 0);
					if (Choice <= 0)
					{
						const BaseE = (Terrain.Biome.MinimumElevation + Terrain.Biome.MaximumElevation);
						const MinElevation = BaseE * Obj.MinimumElevation;
						const MaxElevation = BaseE * Obj.MaximumElevation;
						const BaseM = (Terrain.Biome.MinimumMoisture + Terrain.Biome.MaximumMoisture);
						const MinM = BaseM * Obj.MinimumMoisture;
						const MaxM = BaseM * Obj.MaximumMoisture;
						const BaseT = (Terrain.Biome.MinimumTemp + Terrain.Biome.MaximumTemp);
						const MinT = BaseT * Obj.MinimumTemperature;
						const MaxT = BaseT * Obj.MaximumTemperature;
						if (MaxElevation >= Terrain.Elevation && MinElevation <= Terrain.Elevation &&
							MaxM >= Terrain.Moisture && MinM <= Terrain.Moisture &&
							MaxT >= Terrain.Temperature && MinT <= Terrain.Temperature)
						{
							//let Coll = CollisionCalculator.Calculate(new CFrame(Terrain.RealPosition.Position.add(new Vector3(0, 50, 0))), Terrain.RealPosition.Position.sub(new Vector3(0, -5, 0)), 500, RayP);
							const FullSizeOfModel = Obj.Model.GetExtentsSize();
							Terrain.ModelToSpawnHere = Obj;
							Terrain.SpawnModelAt = new CFrame(Terrain.RealPosition.Position.add(new Vector3(0, FullSizeOfModel.Y / 2 + Obj.YOffset, 0)));
						}
					}
				}
			});
		}
		return CurrentTerrain;
	}

	public GetThreadsForTerrainFilling (CurrentTerrain: TerrainResult[]): thread[]
	{
		const Threads: thread[] = [];
		for (let Index = 0; Index < CurrentTerrain.size(); Index += 50)
		{
			const Thread = coroutine.create(() =>
			{
				const Sleeper = new Sleep(1);
				for (let ThisOffset = Index; ThisOffset < Index + 50 && ThisOffset < CurrentTerrain.size(); ThisOffset++)
				{
					Sleeper.Step();
					const Terrain = CurrentTerrain[ThisOffset];
					if (!(this.AlreadyRendered.some(A => A.X === Terrain.X && A.Z === Terrain.Z)))
					{
						const FakeElevation = this.TerrainReq.SizePerCell * (Terrain.Elevation * SNumbers.Terrain.TerrainElevation);

						const Pos = new Vector3(Terrain.RealPosition.X, FakeElevation, Terrain.RealPosition.Z);
						const Siz = new Vector3(this.TerrainReq.SizePerCell, this.TerrainReq.SizePerCell * 2, this.TerrainReq.SizePerCell);

						const Part = new Instance("Part", TerrainHelper.Workspace);
						Part.Anchored = true;
						Part.Name = "TerrainPart";
						Part.Position = Pos;
						Part.Size = Siz;
						Part.CanCollide = false;
						Part.Transparency = 1;

						const BB = Terrain.Biome;
						Part.Size = BB.BiomeEnum === BiomeType.Ocean ? new Vector3(Part.Size.X, this.TerrainReq.WaterHeightOffset, Part.Size.Z) : Part.Size;
						Part.Position = BB.BiomeEnum === BiomeType.Ocean ? new Vector3(Part.Position.X, Part.Size.Y, Part.Position.Z) : Part.Position;
						TerrainHelper.Workspace.Terrain.FillBlock(Part.CFrame, Part.Size, BB.GroundMaterialDefault);
						Part.Destroy();
					}
				}
			});
			Threads.push(Thread);
		}
		return Threads;
	}

	/** The coords of the heightmap are 0 to width. The coords of the map in real world space are subtracted by half the width to offset it
	to the center of the real world space. */
	public GetTerrain (Xp: number, Zp: number, Xpt: number, Zpt: number): TerrainResult[]
	{
		const Stepper = new Sleep(70000);
		let T: TerrainResult[] = [];
		const OffsetXWidthMin = -(this.TerrainReq.MapBoundaryMax / 2);
		const OffsetXWidthMax = (this.TerrainReq.MapBoundaryMax / 2);

		const OffsetZWidthMin = -(this.TerrainReq.MapBoundaryMax / 2);
		const OffsetZWidthMax = (this.TerrainReq.MapBoundaryMax / 2);

		Xp = Xp < OffsetXWidthMin ? OffsetXWidthMin : Xp;
		Zp = Zp < OffsetZWidthMin ? OffsetZWidthMin : Zp;
		Xpt = Xpt > OffsetXWidthMax ? OffsetXWidthMax : Xpt;
		Zpt = Zpt > OffsetZWidthMax ? OffsetZWidthMax : Zpt;

		const NormalXp = Xp + this.TerrainReq.MapBoundaryMax / 2;
		const NormalZp = Zp + this.TerrainReq.MapBoundaryMax / 2;
		const NormalXpt = Xpt + this.TerrainReq.MapBoundaryMax / 2;
		const NormalZpt = Zpt + this.TerrainReq.MapBoundaryMax / 2;

		const ElevationMap: number[][] =		NoiseHelper.GenerateHeightmap(NormalXp, NormalZp, NormalXpt, NormalZpt, this.TerrainReq.MapBoundaryMax, this.TerrainReq.MapBoundaryMax / 150, this.TerrainReq.ElevationMapZ, 5, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));
		const MoistureMap: number[][] =			NoiseHelper.GenerateHeightmap(NormalXp, NormalZp, NormalXpt, NormalZpt, this.TerrainReq.MapBoundaryMax, this.TerrainReq.MapBoundaryMax / 150, this.TerrainReq.MoistureMapZ, 12, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));
		const TemperatureMap: number[][] =		NoiseHelper.GenerateTemperatureMap(NormalXp, NormalZp, NormalXpt, NormalZpt, this.TerrainReq.MapBoundaryMax, new Sleep(SNumbers.Terrain.NoiseHelperStepAmount));

		for (let RealWorldRequestedX = Xp; RealWorldRequestedX < OffsetXWidthMax && RealWorldRequestedX >= OffsetXWidthMin && RealWorldRequestedX < Xpt; RealWorldRequestedX++)
		{
			const NormalX = RealWorldRequestedX + this.TerrainReq.MapBoundaryMax / 2; // -100 + (1200 / 2) = 500 (client wants a little left-center of map in real world coords)
			for (let RealWorldRequestedZ = Zp; RealWorldRequestedZ < OffsetZWidthMax && RealWorldRequestedZ >= OffsetZWidthMin && RealWorldRequestedZ < Zpt; RealWorldRequestedZ++)
			{
				const NormalZ = RealWorldRequestedZ + this.TerrainReq.MapBoundaryMax / 2;
				let TR: TerrainResult | undefined = undefined;
				const Elevation = ElevationMap[NormalX][NormalZ];
				const FakeElevation = this.TerrainReq.SizePerCell * (Elevation * SNumbers.Terrain.TerrainElevation);
				const Moisture = MoistureMap[NormalX][NormalZ];
				const Temperature = TemperatureMap[NormalX][NormalZ];

				const Pos = new CFrame(RealWorldRequestedX * this.TerrainReq.SizePerCell, FakeElevation, RealWorldRequestedZ * this.TerrainReq.SizePerCell);

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
			T = this.ModifyTerrainWithObjects(T);
		}
		return T;
	}
}