import { Entity } from "../../../../shared/classes/in game/entities/Entity";
import { FoAFaction } from "../../../../shared/classes/in game/factions/Faction";
import { OpponentFoAFaction } from "../../../../shared/classes/in game/factions/OpponentFoAFaction";
import { SelfFoAFaction } from "../../../../shared/classes/in game/factions/SelfFoAFaction";

export class EntityMapper
{
	static MapVisibleEntities (VisibleTo: SelfFoAFaction, AllOtherFactions: OpponentFoAFaction[]): Map<FoAFaction, Partial<Entity>[]>
	{
		let M = new Map<FoAFaction, Partial<Entity>[]>();
		AllOtherFactions.forEach(OpposingFaction =>
		{
			OpposingFaction.Entities.forEach(OpposingEntity =>
			{
				let EntityPosition = Entity.GetPositionalAverage(OpposingEntity);
				
			});
		});
		return M;
	}
}