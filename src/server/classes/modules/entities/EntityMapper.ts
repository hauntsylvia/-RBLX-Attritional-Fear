import { Entity } from "../../../../shared/classes/in game/entities/implementations/Entity";
import { SelfFoAFaction } from "../../../../shared/classes/in game/factions/implementations/SelfFoAFaction";
import { FoAFaction } from "../../../../shared/classes/in game/factions/interfaces/FoAFaction";
import { Rate } from "../../../../shared/classes/util/measurements/Rate";
import { MetricUnits, TimeUnits } from "../../../../shared/consts/Enums";

export class EntityMapper
{
	/**
	 * Returns an array of partial entities the supplied selffaction can currently see.
	 * @param VisibleTo
	 * @param AllOtherFactions
	 */
	static MapVisibleEntities (VisibleTo: SelfFoAFaction, AllOtherFactions: FoAFaction[]): Partial<Entity>[]
	{
		let M: Partial<Entity>[] = [];
		AllOtherFactions.forEach(OpposingFaction =>
		{
			OpposingFaction.Entities.forEach(OpposingEntity =>
			{
				let EntityPosition = Entity.GetPositionalAverage(OpposingEntity);
				VisibleTo.Entities.forEach(SelfEntity =>
				{
					let SelfEntityPosition = Entity.GetPositionalAverage(SelfEntity);
					if (SelfEntityPosition.sub(EntityPosition).Magnitude <= Rate.Convert(MetricUnits.RobloxStud, SelfEntity.EntitySightRadius.TimeUnit, SelfEntity.EntitySightRadius).DistanceValue)
					{
						M.push(OpposingEntity);
					}
				});
			});
		});
		return M;
	}

	static IsEntityVisibleToFaction (VisibleTo: SelfFoAFaction, OE: Entity): boolean
	{
		let ToReturn: boolean = false;
		VisibleTo.Entities.forEach(E =>
		{
			let SelfEntityPosition = Entity.GetPositionalAverage(E);
			let OEPosition = Entity.GetPositionalAverage(OE);
			if (SelfEntityPosition.sub(OEPosition).Magnitude <= Rate.Convert(MetricUnits.RobloxStud, E.EntitySightRadius.TimeUnit, E.EntitySightRadius).DistanceValue)
			{
				ToReturn = true;
			}
		});
		return ToReturn;
	}
}