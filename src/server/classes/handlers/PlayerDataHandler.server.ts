import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";

const DataStore = game.GetService("DataStoreService").GetDataStore(Strings.DataStrings.FoAPlayerSettingsDataStore);

function GetFoAPlayerSettings (Player: Player): FoAPlayerSettings
{
    let Settings: FoAPlayerSettings | undefined = DataStore.GetAsync<FoAPlayerSettings>(Player.UserId + "-FoAPlayerSettings");
    Settings = Settings ?? new FoAPlayerSettings(undefined);
    return Settings;
}

const ThisHandler = new Handler(Strings.PlayerStrings.PlayerHandlerRoute,
    [
        new Endpoint<any, FoAPlayerSettings>(Strings.PlayerStrings.GetAllActivePlayerFactions, GetFoAPlayerSettings),
    ]);


Server.RegisterHandler(ThisHandler);

export { };