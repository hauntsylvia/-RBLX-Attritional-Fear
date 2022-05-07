import { Entity } from "./Entity";
import { IEntityDamageEvent } from "./IEntityDamageEvent";

export class EntityDamageEvent implements IEntityDamageEvent
{
    constructor (FullEntityDeathWhenActive: boolean, Name: string, Description: string, HelpfulDescription: string, WhenDamaged: (E: Entity) => void, OnTickB: () => boolean)
    {
        this.FullEntityDeathWhenActive = FullEntityDeathWhenActive;
        this.Name = Name;
        this.Description = Description;
        this.HelpfulDescription = HelpfulDescription;
        this.WhenDamaged = WhenDamaged;
        this.OnTick = () =>
        {
            this.IsActive = OnTickB();
        };
    }

    IsActive: boolean = false;

    FullEntityDeathWhenActive: boolean;

    Name: string;

    Description: string;

    HelpfulDescription: string;

    WhenDamaged: (E: Entity) => void;

    OnTick: () => void;
}