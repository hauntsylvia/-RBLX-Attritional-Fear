import { PlayerProcessor } from "../processors/PlayerProcessor";
import { TerrainProcessor } from "../processors/TerrainProcessor";

export class FoAClient
{
    constructor(RemoteFunction: RemoteFunction)
    {
        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
        this.TerrainProcessor = new TerrainProcessor(RemoteFunction);
    }

    PlayerProcessor: PlayerProcessor;

    TerrainProcessor: TerrainProcessor;
}