import { Entity } from "./Entity";
import { PenetrationForce } from "./forces/PenetrationForce";
import { IEntityDamageEvent } from "./IEntityDamageEvent";

export class EntityDamageEvent implements IEntityDamageEvent
{
    constructor (FullEntityDeathWhenActive: boolean, Name: string, Description: string, HelpfulDescription: string, MinimumPenetrationalForce: PenetrationForce)
    {
        this.FullEntityDeathWhenActive = FullEntityDeathWhenActive;
        this.Name = Name;
        this.Description = Description;
        this.HelpfulDescription = HelpfulDescription;
        this.MinimumPenetrationalForce = MinimumPenetrationalForce;
    }

    IsActive: boolean = false;

    FullEntityDeathWhenActive: boolean;

    Name: string;

    Description: string;

    HelpfulDescription: string;

    MinimumPenetrationalForce: PenetrationForce;
}