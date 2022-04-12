import { Server } from "server/classes/Server";
import { Faction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";
import { Endpoint } from "shared/classes/server helpers/Endpoint";
import { Handler } from "shared/classes/server helpers/Handler";
import { Strings } from "shared/consts/Strings";



function GetPlayerFactions(Player: Player, Arg: any): FoAPlayer[]
{
    return [new FoAPlayer(Player)];
}

function RegisterPlayerFaction(Player: Player, Arg: Faction): Faction | undefined
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
        new Endpoint<any, FoAPlayer[]>(Strings.PlayerStrings.GetPlayerFactionsRoute, GetPlayerFactions),
        new Endpoint<Faction, Faction | undefined>(Strings.PlayerStrings.RegisterPlayerFaction, RegisterPlayerFaction),
        new Endpoint<Player, FoAPlayer | undefined>(Strings.PlayerStrings.RegisterCurrentPlayer, RegisterPlayerToGame)
    ]);


Server.RegisterHandler(PlayerHandler);

export {};