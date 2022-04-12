import { PlayerProcessor } from "../processors/PlayerProcessor";

export class FoAClient
{
    constructor(RemoteFunction: RemoteFunction)
    {
        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
    }
    PlayerProcessor: PlayerProcessor;
}