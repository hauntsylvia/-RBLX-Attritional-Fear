import { Register } from "../../server/classes/modules/Register";
import { Strings } from "./Strings";

export class Registers
{
	static PlayerSettingsRegister = new Register(Strings.DataStrings.FoAPlayerSettingsDataStore, "-Settings", 4);
}