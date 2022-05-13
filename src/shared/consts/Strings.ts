import { BuildingTypes, BuildingVisuals, PartType } from "./Enums";

export enum FactionTitleKeys
{
    Manufacturer = 0,
    OilCollector = 1,
    SteelHoarder = 2,
    Dreadful = 3,
    DreadnoughtKiller = 4,
    Prospector = 5,
    Atomic = 6,
    Anomic = 7,
    AirTraverser = 8
}
export class Strings
{
    static AvailableServicesFolderName = "Available Services";
    static ServerAPIStrings = class
    {
        static APIInstanceName: string = "APIInstance";
        static APIReplicatorName: string = "APIReplicator";
        static DataStrings = class
        {
            static FoAPlayerSettingsDataStore: string = "FoA.PlayerSettings";
        };
        static PlayerStrings = class
        {
            static PlayerHandlerRoute: string = "Players";
            static PlayerDataHandlerRoute: string = "Player.Data";

            static GetAllActivePlayerFactions: string = "GetFactions";
            static RegisterPlayerFaction: string = "RegisterFaction";
            static GetFoAPlayerFromPlayer: string = "RegisterCurrentPlayer";

            static GetFoAPlayerSettings: string = "GetFoAPlayerSettings";
            static SaveFoAPlayerSettings: string = "SaveFoAPlayerSettings";
        };
        static TerrainStrings = class
        {
            static TerrainHandlerRoute = "Terrain";

            static GetMapData = "GetMapData";
            static GetChunkOfTerrain = "GetChunk";
        };
        static VesselHandlerStrings = class
        {
            static VesselHandlerRoute: string = "Vessels";

            static TryToMakeVessel: string = "MakeVessel";
        };
        static EntityStrings = class
        {
            static EntityHandlerRoute: string = "Entities";

            static GetEntityById: string = "ById";
        };
	}
    static FactionStrings = class
    {
        static FactionTitles: Map<FactionTitleKeys, string> = new Map<FactionTitleKeys, string>(
            [
                [FactionTitleKeys.Manufacturer, "Manufacturer"],
                [FactionTitleKeys.SteelHoarder, "Steel Hoarder"],
                [FactionTitleKeys.Dreadful, "Dreadful"],
                [FactionTitleKeys.DreadnoughtKiller, "Dreadnought Killer"],
                [FactionTitleKeys.Prospector, "Prospector"],
                [FactionTitleKeys.Atomic, "Atomic"],
                [FactionTitleKeys.Anomic, "Anomic"],
                [FactionTitleKeys.AirTraverser, "Air Traverser"]
            ]);
    };
    static StorageStrings = class
    {
        static GetBiomeModelsFolder (): Folder
        {
            let F = game.GetService("ReplicatedStorage").WaitForChild("Biomes")?.WaitForChild("Models");
            if (F !== undefined && F.IsA("Folder"))
            {
                return F;
            }
            else
            {
                let F1 = new Instance("Folder", game.GetService("ReplicatedStorage"));
                F1.Name = "Biomes";
                let F2 = new Instance("Folder", F1);
                F2.Name = "Models";
                return F2;
            }
        }
        static GetVesselPartsFolder (PType: PartType): Folder
        {
            let F = game.GetService("ReplicatedStorage").WaitForChild(".Vessel Parts")?.WaitForChild("Models")?.WaitForChild(PartType[PType]);
            if (F !== undefined && F.IsA("Folder"))
            {
                return F;
            }
            else
            {
                let F1 = new Instance("Folder", game.GetService("ReplicatedStorage"));
                F1.Name = ".Vessel Parts";
                let F2 = new Instance("Folder", F1);
                F2.Name = "Models";
                let F3 = new Instance("Folder", F1);
                F3.Name = PartType[PType];
                return F3;
            }
        }
        static GetBuildingModel (BuildingVisuals: BuildingVisuals, BuildingType: BuildingTypes): Model | undefined
        {

            let F = game.GetService("ReplicatedStorage").WaitForChild(".Buildings")?.WaitForChild("Models")?.WaitForChild(BuildingVisuals)?.WaitForChild(BuildingType);
            let M = new Instance("Model");
            M.Parent = F;
            M.Name = "DEFAULT MODEL";
            let P = new Instance("Part");
            P.Parent = M;
            P.Name = "DEFAULT PART";
            P.Position = Vector3.zero;
            P.Anchored = true;
            P.CanCollide = false;

            return F.FindFirstChildOfClass("Model");
        }
    };
}