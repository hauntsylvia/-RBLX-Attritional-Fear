import { Entity } from "./Entity";
import { PenetrationForce } from "./forces/PenetrationForce";
import { IEntityDamageEvent } from "./IEntityDamageEvent";

export class EntityDamageEvent implements IEntityDamageEvent
{
    constructor (Name: string, Description: string, HelpfulDescription: string, MinimumPenetrationalForce: PenetrationForce)
    {
        this.Name = Name;
        this.Description = Description;
        this.HelpfulDescription = HelpfulDescription;
        this.MinimumPenetrationalForce = MinimumPenetrationalForce;
    }

    IsActive: boolean = false;

    Name: string;

    Description: string;

    HelpfulDescription: string;

    MinimumPenetrationalForce: PenetrationForce;
}