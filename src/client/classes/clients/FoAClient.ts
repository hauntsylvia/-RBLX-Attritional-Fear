import { TerrainFollower } from "../../../shared/classes/in game/terrain/TerrainFollower";
import { FoACamera } from "../camera/FoACamera";
import { LevelOfZoom } from "../camera/LevelOfZoom";
import { PlayerProcessor } from "../processors/PlayerProcessor";
import { TerrainProcessor } from "../processors/TerrainProcessor";

export class FoAClient
{
    constructor()
    {
        let RemoteFunction = this.WaitForServer();

        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
        let CurrentPlayer = this.PlayerProcessor.GetCurrentPlayer();
        if (CurrentPlayer.Returned !== undefined)
        {
            this.Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), CurrentPlayer.Returned.FoAPlayerSettings);
            this.Camera.Connect();

            this.TerrainProcessor = new TerrainProcessor(RemoteFunction);

            this.TerrainChunker = new TerrainFollower(this.Camera, this.TerrainProcessor, CurrentPlayer.Returned.FoAPlayerSettings.ChunkSettings);
            this.TerrainChunker.Connect();
        }
        else
        {
            error("No player was loaded.");
		}
    }

    PlayerProcessor: PlayerProcessor;

    Camera: FoACamera;

    TerrainProcessor: TerrainProcessor;

    TerrainChunker: TerrainFollower;

    WaitForServer (): RemoteFunction
    {
        let RemoteFunction = game.GetService("ReplicatedStorage").WaitForChild("API", 60) as RemoteFunction;
        return RemoteFunction;
	}
}