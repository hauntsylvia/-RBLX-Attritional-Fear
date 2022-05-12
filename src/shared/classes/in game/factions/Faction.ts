import { FactionTitleKeys } from "../../../consts/Strings";
import { IBuilding } from "../buildings/interfaces/IBuilding";
import { Entity } from "../entities/Entity";
import { FoAPlayer } from "../players/FoAPlayer";
import { SelfFoAPlayer } from "../players/SelfFoAPlayer";
import { CrewMember } from "../vessels/CrewMember";

export interface FoAFaction
{
    Player?: FoAPlayer;

    UserId: number;

    Name: string;

    SpawnLocation: Vector3;

    Title: FactionTitleKeys;

    Color: Color3;

    Buildings: Partial<IBuilding[]>;

    Crew: Partial<CrewMember[]>;

    Entities: Partial<Entity[]>;
}