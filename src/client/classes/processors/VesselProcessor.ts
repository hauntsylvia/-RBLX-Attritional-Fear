
import { Vessel } from "../../../shared/classes/in game/vessels/Vessel";
import { ServerRequest } from "../../../shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "../../../shared/classes/server helpers/ServerResponse";
import { Strings } from "../../../shared/consts/Strings";
import { Processor } from "./Processor";

export class VesselProcessor extends Processor
{
    constructor (APIInstance: RemoteFunction)
    {
        super(APIInstance);
    }

    TryToMakeVessel (Vessel: Vessel): ServerResponse<Vessel>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.Endpoints.VesselHandlerStrings.VesselHandlerRoute, Strings.Endpoints.VesselHandlerStrings.TryToMakeVessel, Vessel));
    }

    TryToMoveVessel (Vessel: Vessel, MoveTo: Vector3, Throttle: number): ServerResponse<boolean>
    {
        return this.MakeRequest(new ServerRequest<any>(Strings.Endpoints.VesselHandlerStrings.VesselHandlerRoute, Strings.Endpoints.VesselHandlerStrings.TryToMoveAVessel, [Vessel.Id, MoveTo, Throttle]));
	}
}