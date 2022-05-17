import { IBuilding } from "../../buildings/interfaces/IBuilding";
import { Entity } from "../../entities/implementations/Entity";
import { FoAPlayer } from "../../players/FoAPlayer";
import { CrewMember } from "../../vessels/CrewMember";
import { FactionArguments } from "../implementations/FactionArguments";

export interface FoAFaction
{
    Player?: FoAPlayer;

    UserId: number;

    FactionDescriptors: FactionArguments;

    SpawnLocation: Vector3;

    Buildings: IBuilding[];

    Crew: CrewMember[];

    Entities: Entity[];
}