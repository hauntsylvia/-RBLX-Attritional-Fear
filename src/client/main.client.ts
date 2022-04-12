import { Faction } from "shared/classes/in game/factions/Faction";
import { FoAClient } from "./classes/clients/FoAClient";

const Client = new FoAClient(game.GetService("ReplicatedStorage").WaitForChild("API", 2) as RemoteFunction);
let RegPlr = Client.PlayerProcessor.RegisterCurrentPlayerToGame();
if(RegPlr.Returned !== undefined)
{
    let Fact = Client.PlayerProcessor.RegisterFactionToGame(new Faction(RegPlr.Returned, "Ratte", Color3.fromRGB(0, 0, 0)))
    print(Fact.Returned);
}

export {};