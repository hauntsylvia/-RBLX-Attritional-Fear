import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Registers } from "../../../shared/consts/Registers";
import { Record } from "../modules/Record";

function GetFoAPlayerSettings (Player: Player): FoAPlayerSettings
{
    let Settings: Record<FoAPlayerSettings> | undefined = Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId);
    let SettingsV = Settings.Value ?? new FoAPlayerSettings(undefined);
    return SettingsV;
}

function SaveFoAPlayerSettings (Player: Player, SettingsToSave: FoAPlayerSettings): ServerDataOperationResponse
{
    return Registers.PlayerSettingsRegister.SaveRecord(Player.UserId, SettingsToSave);
}

const ThisHandler = new Handler(Strings.PlayerStrings.PlayerHandlerRoute,
    [
        new Endpoint<any, FoAPlayerSettings>(Strings.PlayerStrings.GetFoAPlayerSettings, GetFoAPlayerSettings),
        new Endpoint<FoAPlayerSettings, ServerDataOperationResponse>(Strings.PlayerStrings.SaveFoAPlayerSettings, SaveFoAPlayerSettings),
    ]);


Server.RegisterHandler(ThisHandler);

export { };