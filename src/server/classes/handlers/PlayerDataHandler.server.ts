import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataSaveResponse } from "../../../shared/classes/server helpers/ServerDataSaveResponse";
import { Registers } from "../../../shared/consts/Registers";
import { Record } from "../modules/Record";

function GetFoAPlayerSettings (Player: Player): FoAPlayerSettings
{
    let Settings: FoAPlayerSettings | undefined = Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId).Value;
    Settings = Settings ?? new FoAPlayerSettings(undefined);
    return Settings;
}

const RecentTransactions: Map<number, DateTime> = new Map<number, DateTime>();
function SaveFoAPlayerSettings (Player: Player, SettingsToSave: FoAPlayerSettings): ServerDataSaveResponse
{
    if (RecentTransactions.has(Player.UserId) && (RecentTransactions.get(Player.UserId) as DateTime) <= DateTime.now())
    {
        let RetryAt: DateTime = DateTime.fromUnixTimestamp(os.time() + 15);
        return new ServerDataSaveResponse(RetryAt);
    }
    else
    {
        RecentTransactions.set(Player.UserId, DateTime.fromUnixTimestamp(os.time() + 15));
        Registers.PlayerSettingsRegister.SaveRecord(Player.UserId, new Record<FoAPlayerSettings>(true, SettingsToSave));
        return new ServerDataSaveResponse(undefined);
	}
}

const ThisHandler = new Handler(Strings.PlayerStrings.PlayerHandlerRoute,
    [
        new Endpoint<any, FoAPlayerSettings>(Strings.PlayerStrings.GetFoAPlayerSettings, GetFoAPlayerSettings),
        new Endpoint<FoAPlayerSettings, ServerDataSaveResponse>(Strings.PlayerStrings.SaveFoAPlayerSettings, SaveFoAPlayerSettings),
    ]);


Server.RegisterHandler(ThisHandler);

export { };