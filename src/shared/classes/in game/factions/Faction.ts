import { FactionTitleKeys } from "../../../consts/Strings";
import { IBuilding } from "../buildings/interfaces/IBuilding";
import { Entity } from "../entities/Entity";
import { FoAPlayer } from "../players/FoAPlayer";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";
import { CrewMember } from "../vessels/CrewMember";
import { FactionArguments } from "./FactionArguments";

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