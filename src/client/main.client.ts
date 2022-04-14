import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoAClient } from "./classes/clients/FoAClient";

const Client = new FoAClient(game.GetService("ReplicatedStorage").WaitForChild("API", 2) as RemoteFunction);
let RegPlr = Client.PlayerProcessor.GetCurrentPlayer();
if(RegPlr.Returned !== undefined)
{
    let Fact = Client.PlayerProcessor.RegisterFactionToGame(new FoAFaction(RegPlr.Returned, "Ratte", FactionTitleKeys.Manufacturer, Color3.fromRGB(255, 210, 255)));
    wait(6);
    let A = Client.PlayerProcessor.SaveFoAPlayerSettings(RegPlr.Returned.FoAPlayerSettings);
    print(A);
}

export {};