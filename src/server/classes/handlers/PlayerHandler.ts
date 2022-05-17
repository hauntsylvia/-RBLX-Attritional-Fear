import { Server } from "server/classes/server communication/Server";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Registers } from "../../../shared/consts/Registers";
import { ServerData } from "../server communication/ServerData";
import { IHandler } from "./Handler";
import { StuffOnRoundStart } from "../../../shared/consts/in game/factions/StuffOnRoundStart";
import { Replicator } from "../client communication/Replicator";
import { ServerJob } from "../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../shared/consts/Enums";
import { FoAFaction } from "../../../shared/classes/in game/factions/interfaces/FoAFaction";
import { FactionArguments } from "../../../shared/classes/in game/factions/implementations/FactionArguments";
import { OtherFoAFaction } from "../../../shared/classes/in game/factions/implementations/OtherFoAFaction";
import { SelfFoAFaction } from "../../../shared/classes/in game/factions/implementations/SelfFoAFaction";

export class PlayerHandler implements IHandler
{
    Name: string = Strings.ServerAPIStrings.PlayerStrings.PlayerHandlerRoute;

    Endpoints =
        [
            new Endpoint<any, FoAFaction[]>(Strings.ServerAPIStrings.PlayerStrings.GetAllActivePlayerFactions,
                (Player: Player) => this.GetAllActivePlayerFactions(Player)),
            new Endpoint<FactionArguments, FoAFaction | undefined>(Strings.ServerAPIStrings.PlayerStrings.RegisterPlayerFaction,
                (Player: Player, Arg: FactionArguments, Replicator: Replicator) => this.RegisterPlayerFaction(Player, Arg, Replicator)),
            new Endpoint<any, SelfFoAPlayer>(Strings.ServerAPIStrings.PlayerStrings.GetFoAPlayerFromPlayer,
                (Player: Player) => this.GetFoAPlayerFromPlayer(Player))
        ]

    ServerData!: ServerData;

    GetAllActivePlayerFactions (Player: Player): OtherFoAFaction[]
    {
        return this.ServerData.CurrentActiveFactions as OtherFoAFaction[];
    }

    RegisterPlayerFaction (Player: Player, Arg: FactionArguments, Replicator: Replicator): SelfFoAFaction | undefined
    {
        if (!this.ServerData.CurrentActiveFactions.some(Faction => Faction.UserId === Player.UserId))
        {
            let SFoAPlayer = this.ServerData.CurrentActivePlayers.find(S => S.RobloxPlayerInstance.UserId === Player.UserId);
            if (SFoAPlayer !== undefined)
            {
                let TerrSize = this.ServerData.TerrainData.TerrainRequest.MapBoundaryMax * this.ServerData.TerrainData.TerrainRequest.SizePerCell;
                let AdjustedTerSize = TerrSize / 2;
                let RanX = new Random().NextInteger(-AdjustedTerSize, AdjustedTerSize);
                let RanZ = new Random().NextInteger(-AdjustedTerSize, AdjustedTerSize);
                let StartingPos = new Vector3(RanX, 50, RanZ);
                let StartingInformation = new StuffOnRoundStart(SFoAPlayer, new CFrame(StartingPos));
                let NewFac = new SelfFoAFaction(SFoAPlayer, Player.UserId, StartingPos, Arg, StartingInformation.StartingBuildings, StartingInformation.StartingVessels, StartingInformation.StartingCrew);
                let WhatOthersSee = new OtherFoAFaction(SFoAPlayer, Player.UserId, NewFac.SpawnLocation, Arg, [], [], []);
                this.ServerData.CurrentActiveFactions.push(NewFac);
                Replicator.SendToClient(game.GetService("Players").GetPlayers(), new ServerJob<OtherFoAFaction>(ServerJobSpecifications.FactionInGameChanged, WhatOthersSee));
                return NewFac;
            }
        }
    }

    GetFoAPlayerFromPlayer (Player: Player): SelfFoAPlayer
    {
        let MatchingFoAPlayer = this.ServerData.CurrentActivePlayers.find(P => P.RobloxPlayerInstance.UserId === Player.UserId);
        if (MatchingFoAPlayer === undefined)
        {
            let NewPlayer: SelfFoAPlayer = new SelfFoAPlayer(Player, Registers.PlayerSettingsRegister.GetRecord<FoAPlayerSettings>(Player.UserId).Value ?? new FoAPlayerSettings(undefined));
            this.ServerData.CurrentActivePlayers.push(NewPlayer);
            return NewPlayer;
        }
        else
        {
            return MatchingFoAPlayer;
        }
    }

    ServerRegistering (Data: ServerData)
    {
        this.ServerData = Data;
    }
}