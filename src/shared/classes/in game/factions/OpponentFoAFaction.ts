import { FactionTitleKeys } from "../../../consts/Strings";
import { IBuilding } from "../buildings/interfaces/IBuilding";
import { Entity } from "../entities/Entity";
import { FoAPlayer } from "../players/FoAPlayer";
import { CrewMember } from "../vessels/CrewMember";
import { FoAFaction } from "./Faction";

export class OpponentFoAFaction implements FoAFaction
{
    constructor (Player: FoAPlayer, UserId: number, Name: string, SpawnLoc: Vector3, Title: FactionTitleKeys, Color: Color3, Buildings: IBuilding[], Entities: Entity[], Crew: CrewMember[])
    {
        this.Player = Player;
        this.UserId = UserId;
        this.Name = Name;
        this.SpawnLocation = SpawnLoc;
        this.Title = Title;
        this.Color = Color;
        this.Buildings = Buildings;
        this.Entities = Entities;
        this.Crew = Crew;
    }

    Player?: FoAPlayer;

    UserId: number;

    Name: string;

    SpawnLocation: Vector3;

    Title: FactionTitleKeys;

    Color: Color3;

    Buildings: IBuilding[];

    Entities: Entity[];

    Crew: CrewMember[];
}