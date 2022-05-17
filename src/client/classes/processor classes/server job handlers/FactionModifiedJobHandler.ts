import { OtherFoAFaction } from "../../../../shared/classes/in game/factions/implementations/OtherFoAFaction";
import { Vessel } from "../../../../shared/classes/in game/vessels/Vessel";
import { ServerJob } from "../../../../shared/classes/server helpers/server replications/ServerJob";
import { ServerJobSpecifications } from "../../../../shared/consts/Enums";
import { FoAClient } from "../../clients/FoAClient";
import { ServerJobHandler } from "./ServerJobHandler";

export class FactionModifiedJobHandler extends ServerJobHandler<OtherFoAFaction>
{
	constructor (Client: FoAClient)
	{
		super((A) => this.OnFactionModified(A), ServerJobSpecifications.FactionInGameChanged);
		this.ClientReference = Client;
	}

	ClientReference: FoAClient;

	OnFactionModified (A: ServerJob<OtherFoAFaction>)
	{
		if (A.Returned !== undefined)
		{
			this.ClientReference.PlayerProcessor.KnownFactions.push(A.Returned);
			print("Faction belonging to player of id " + A.Returned.UserId + " sent!");
		}
	}
}