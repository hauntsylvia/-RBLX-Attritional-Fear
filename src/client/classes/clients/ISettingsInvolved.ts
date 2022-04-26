import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";

export interface ISettingsInvolved
{
	LoadNewSettings (Settings: FoAPlayerSettings): any;
	Connect (): any;
	Disconnect (): any;
}