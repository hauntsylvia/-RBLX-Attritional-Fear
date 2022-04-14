import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Registers } from "../../../shared/consts/Registers";



function GetAllActivePlayerFactions (Player: Player, Arg: any): FoAFaction[]
{
    return Server.ServerData.CurrentActiveFactions;
}


function RegisterPlayerFaction(Player: Player, Arg: FoAFaction): FoAFaction | undefined
{
    if(!Server.ServerData.CurrentActiveFactions.some(function(Faction)
    {
        return Faction.Player.RobloxPlayerInstance.UserId === Player.UserId;
    }) && Arg.Player.RobloxPlayerInstance.UserId === Player.UserId)
    {
        Server.ServerData.CurrentActiveFactions.push(Arg);
        return Arg;
    }
}

function GetFoAPlayerFromPlayer(Player: Player): SelfFoAPlayer | undefined
{
    if(!Server.ServerData.CurrentActivePlayers.some(function(P)
    {
        return P.RobloxPlayerInstance.UserId === Player.UserId;
    }))
    {
        let NewPlayer: SelfFoAPlayer = new SelfFoAPlayer(Player, Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId).Value ?? new FoAPlayerSettings(undefined));
        Server.ServerData.CurrentActivePlayers.push(NewPlayer);
        return NewPlayer;
    }
}
const PlayerHandler = new Handler(Strings.PlayerStrings.PlayerHandlerRoute, 
    [
        new Endpoint<any, FoAFaction[]>(Strings.PlayerStrings.GetAllActivePlayerFactions, GetAllActivePlayerFactions),
        new Endpoint<FoAFaction, FoAFaction | undefined>(Strings.PlayerStrings.RegisterPlayerFaction, RegisterPlayerFaction),
        new Endpoint<Player, SelfFoAPlayer | undefined>(Strings.PlayerStrings.GetFoAPlayerFromPlayer, GetFoAPlayerFromPlayer)
    ]);


Server.RegisterHandler(PlayerHandler);

export {};