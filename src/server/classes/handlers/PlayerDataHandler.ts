import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Registers } from "../../../shared/consts/Registers";
import { Record } from "../modules/Record";
import { Handler } from "./Handler";
import { ServerData } from "../server communication/ServerData";

export class PlayerDataHandler extends Handler
{
    static __AddToImps = Handler.Implementations.add(new PlayerDataHandler());

    constructor ()
    {
        super(PlayerDataHandler.Name, PlayerDataHandler.Endpoints);
    }

    static Name: string = Strings.PlayerStrings.PlayerDataHandlerRoute;

    static Endpoints: Endpoint<any, any>[] = 
    [
        new Endpoint<any, FoAPlayerSettings>(Strings.PlayerStrings.GetFoAPlayerSettings, (Player: Player) => this.GetFoAPlayerSettings(Player)),
        new Endpoint<FoAPlayerSettings, ServerDataOperationResponse>(Strings.PlayerStrings.SaveFoAPlayerSettings, (Player: Player, S: FoAPlayerSettings) => this.SaveFoAPlayerSettings(Player, S)),
    ];

    static GetFoAPlayerSettings (Player: Player): FoAPlayerSettings
    {
        let Settings: Record<FoAPlayerSettings> | undefined = Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId);
        let SettingsV = Settings.Value ?? new FoAPlayerSettings(undefined);
        return SettingsV;
    }

    static SaveFoAPlayerSettings (Player: Player, SettingsToSave: FoAPlayerSettings): ServerDataOperationResponse
    {
        return Registers.PlayerSettingsRegister.SaveRecord(Player.UserId, SettingsToSave);
    }

    ServerRegistering (Data: ServerData)
    {

	}
}