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
    static DataStrings = class
    {
        static FoAPlayerSettingsDataStore: string = "FoA.PlayerSettings";
	}
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
            let F = game.GetService("ReplicatedStorage").WaitForChild("Biomes", 5)?.WaitForChild("Models", 5);
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
	}
}