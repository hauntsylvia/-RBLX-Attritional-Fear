
import { IBuilding } from "../../buildings/interfaces/IBuilding";
import { Entity } from "../../entities/implementations/Entity";
import { FoAPlayer } from "../../players/FoAPlayer";
import { CrewMember } from "../../vessels/CrewMember";
import { FoAFaction } from "../interfaces/FoAFaction";
import { FactionArguments } from "./FactionArguments";

export class OtherFoAFaction implements FoAFaction
{
    constructor (Player: FoAPlayer, UserId: number, SpawnLocation: Vector3, Args: FactionArguments, Buildings: IBuilding[], Entities: Entity[], Crew: CrewMember[])
    {
        this.Player = Player;
        this.UserId = UserId;
        this.SpawnLocation = SpawnLocation;
        this.FactionDescriptors = Args;
        this.Buildings = Buildings;
        this.Entities = Entities;
        this.Crew = Crew;
    }

    Player?: FoAPlayer;

    UserId: number;

    SpawnLocation: Vector3;

    FactionDescriptors: FactionArguments;

    Buildings: IBuilding[];

    Entities: Entity[];

    Crew: CrewMember[];
}