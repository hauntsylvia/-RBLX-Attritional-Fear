import { Register } from "../../server/classes/modules/datastores/Register";
import { Strings } from "./Strings";

export class Registers
{
	static PlayerSettingsRegister = new Register(Strings.Endpoints.DataStrings.FoAPlayerSettingsDataStore, "-Settings", 30);
}