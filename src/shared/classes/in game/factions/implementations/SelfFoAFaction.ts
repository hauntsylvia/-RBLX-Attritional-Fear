
import { IBuilding } from "../../buildings/interfaces/IBuilding";
import { Entity } from "../../entities/implementations/Entity";
import { SelfFoAPlayer } from "../../players/SelfFoAPlayer";
import { CrewMember } from "../../vessels/CrewMember";
import { FoAFaction } from "../interfaces/FoAFaction";
import { FactionArguments } from "./FactionArguments";

export class SelfFoAFaction implements FoAFaction
{
    constructor (Player: SelfFoAPlayer, UserId: number, SpawnLocation: Vector3, Args: FactionArguments, Buildings: IBuilding[], Entities: Entity[], Crew: CrewMember[])
    {
        this.Player = Player;
        this.UserId = UserId;
        this.SpawnLocation = SpawnLocation;
        this.FactionDescriptors = Args;
        this.Buildings = Buildings;
        this.Entities = Entities;
        this.Crew = Crew;
    }

    Player?: SelfFoAPlayer;

    UserId: number;

    SpawnLocation: Vector3;

    FactionDescriptors: FactionArguments;

    Buildings: IBuilding[];

    Entities: Entity[];

    Crew: CrewMember[];
}