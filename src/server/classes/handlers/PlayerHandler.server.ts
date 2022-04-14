import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";



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

function RegisterPlayerToGame(Player: Player): FoAPlayer | undefined
{
    if(!Server.ServerData.CurrentActivePlayers.some(function(P)
    {
        return P.RobloxPlayerInstance.UserId === Player.UserId;
    }))
    {
        let NewPlayer: FoAPlayer = new FoAPlayer(Player);
        Server.ServerData.CurrentActivePlayers.push(NewPlayer);
        return NewPlayer;
    }
}
const PlayerHandler = new Handler(Strings.PlayerStrings.PlayerHandlerRoute, 
    [
        new Endpoint<any, FoAFaction[]>(Strings.PlayerStrings.GetAllActivePlayerFactions, GetAllActivePlayerFactions),
        new Endpoint<FoAFaction, FoAFaction | undefined>(Strings.PlayerStrings.RegisterPlayerFaction, RegisterPlayerFaction),
        new Endpoint<Player, FoAPlayer | undefined>(Strings.PlayerStrings.RegisterCurrentPlayer, RegisterPlayerToGame)
    ]);


Server.RegisterHandler(PlayerHandler);

export {};