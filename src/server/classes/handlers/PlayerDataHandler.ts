import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Registers } from "../../../shared/consts/Registers";
import { Record } from "../modules/Record";
import { IHandler } from "../handlers/IHandler";

@IHandler.Register
export class PlayerDataHandler
{
    constructor ()
    {
        this.Endpoints =
            [
            new Endpoint<any, FoAPlayerSettings>(Strings.PlayerStrings.GetFoAPlayerSettings, (Player: Player) => this.GetFoAPlayerSettings(Player)),
            new Endpoint<FoAPlayerSettings, ServerDataOperationResponse>(Strings.PlayerStrings.SaveFoAPlayerSettings, (Player: Player, S: FoAPlayerSettings) => this.SaveFoAPlayerSettings(Player, S)),
            ];

    }

    Name: string = Strings.PlayerStrings.PlayerDataHandlerRoute;

    Endpoints: Endpoint<any, any>[];

    GetFoAPlayerSettings (Player: Player): FoAPlayerSettings
    {
        let Settings: Record<FoAPlayerSettings> | undefined = Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId);
        let SettingsV = Settings.Value ?? new FoAPlayerSettings(undefined);
        return SettingsV;
    }

    SaveFoAPlayerSettings (Player: Player, SettingsToSave: FoAPlayerSettings): ServerDataOperationResponse
    {
        return Registers.PlayerSettingsRegister.SaveRecord(Player.UserId, SettingsToSave);
    }

}