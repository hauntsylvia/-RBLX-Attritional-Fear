export enum FactionTitleKeys
{
    Manufacturer = 0,
    OilCollector,
    SteelHoarder,
    Dreadful,
    DreadnoughtKiller,
    Prospector,
    Atomic,
    Anomic,
    AirTraverser
}
export class Strings
{
    static DataStrings = class
    {
        static FoAPlayerSettingsDataStore: string = "FoA.PlayerSettings";
	}
    static PlayerStrings = class
    {
        static PlayerHandlerRoute: string = "Players";

        static GetAllActivePlayerFactions: string = "GetFactions";
        static RegisterPlayerFaction: string = "RegisterFaction";
        static GetFoAPlayerFromPlayer: string = "RegisterCurrentPlayer";

        static GetFoAPlayerSettings: string = "GetFoAPlayerSettings";
        static SaveFoAPlayerSettings: string = "SaveFoAPlayerSettings";
    };
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