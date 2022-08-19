import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Registers } from "../../../shared/consts/Registers";
import { IHandler } from "./Handler";
import { ServerData } from "../server communication/ServerData";
import { Record } from "../modules/datastores/Record";

export class PlayerDataHandler implements IHandler
{
    Name: string = Strings.Endpoints.PlayerStrings.PlayerDataHandlerRoute;

    Endpoints: Endpoint<any, any>[] =
    [
            new Endpoint<any, FoAPlayerSettings>(Strings.Endpoints.PlayerStrings.GetFoAPlayerSettings, (Player: Player) => this.GetFoAPlayerSettings(Player)),
            new Endpoint<FoAPlayerSettings, ServerDataOperationResponse>(Strings.Endpoints.PlayerStrings.SaveFoAPlayerSettings, (Player: Player, S: FoAPlayerSettings) => this.SaveFoAPlayerSettings(Player, S)),
    ];

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

    ServerRegistering (Data: ServerData)
    {

	}
}