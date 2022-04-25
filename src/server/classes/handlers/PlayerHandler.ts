import { Server } from "server/classes/server communication/Server";
import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { IHandler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Registers } from "../../../shared/consts/Registers";
import { ServerData } from "../server communication/ServerData";

export class PlayerHandler implements IHandler
{
    constructor ()
    {
        this.Endpoints =
        [
            new Endpoint<any, FoAFaction[]>(Strings.PlayerStrings.GetAllActivePlayerFactions, (Player: Player) => this.GetAllActivePlayerFactions(Player)),
            new Endpoint<FoAFaction, FoAFaction | undefined>(Strings.PlayerStrings.RegisterPlayerFaction, (Player: Player, Arg: FoAFaction) => this.RegisterPlayerFaction(Player, Arg)),
            new Endpoint<Player, SelfFoAPlayer | undefined>(Strings.PlayerStrings.GetFoAPlayerFromPlayer, (Player: Player) => this.GetFoAPlayerFromPlayer(Player))
        ];
	}

    Name: string = Strings.PlayerStrings.PlayerHandlerRoute;

    Endpoints: Endpoint<any, any>[];

    GetAllActivePlayerFactions (Player: Player): FoAFaction[]
    {
        return Server.ServerData.CurrentActiveFactions;
    }

    RegisterPlayerFaction (Player: Player, Arg: FoAFaction): FoAFaction | undefined
    {
        if (!Server.ServerData.CurrentActiveFactions.some(Faction => Faction.Player.RobloxPlayerInstance.UserId === Player.UserId))
        {
            let SFoAPlayer = Server.ServerData.CurrentActivePlayers.find(S => S.RobloxPlayerInstance.UserId === Player.UserId);
            if (SFoAPlayer !== undefined)
            {
                let TerrSize = Server.ServerData.TerrainData.Size / 2;
                let NewFac = new FoAFaction(SFoAPlayer, Player.UserId, Arg.Name, new Vector3(math.random(-TerrSize, TerrSize / 2), 50, math.random(-TerrSize / 2, TerrSize / 2)), Arg.Title, Arg.Color);
                Server.ServerData.CurrentActiveFactions.push(NewFac);
                return NewFac;
            }
        }
    }

    GetFoAPlayerFromPlayer (Player: Player): SelfFoAPlayer | undefined
    {
        let MatchingFoAPlayer = Server.ServerData.CurrentActivePlayers.find(P => P.RobloxPlayerInstance.UserId === Player.UserId);
        if (MatchingFoAPlayer === undefined)
        {
            let NewPlayer: SelfFoAPlayer = new SelfFoAPlayer(Player, Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId).Value ?? new FoAPlayerSettings(undefined));
            Server.ServerData.CurrentActivePlayers.push(NewPlayer);
            return NewPlayer;
        }
        else
        {
            return MatchingFoAPlayer;
        }
    }
}


Server.RegisterHandler(new PlayerHandler());