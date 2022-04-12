import { Faction } from "shared/classes/in game/factions/Faction";
import { FoAPlayer } from "shared/classes/in game/players/FoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { Processor } from "./Processor";

export class PlayerProcessor extends Processor
{
    constructor(Instance: RemoteFunction)
    {
        super(Instance);
    }

    GetAllPlayers(): ServerResponse<FoAPlayer[]>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.GetPlayerFactionsRoute, undefined));
    }

    RegisterFactionToGame(Faction: Faction): ServerResponse<Faction>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.RegisterPlayerFaction, Faction));
    }

    RegisterCurrentPlayerToGame(): ServerResponse<FoAPlayer>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.PlayerStrings.PlayerHandlerRoute, Strings.PlayerStrings.RegisterCurrentPlayer, undefined));
    }
}