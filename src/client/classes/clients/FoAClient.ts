import { TerrainFollower } from "../../../shared/classes/in game/terrain/TerrainFollower";
import { FoACamera } from "../camera/FoACamera";
import { LevelOfZoom } from "../camera/LevelOfZoom";
import { InterfacingObjectsProcessor } from "../processors/InterfacingObjectsProcessor";
import { PlayerProcessor } from "../processors/PlayerProcessor";
import { TerrainProcessor } from "../processors/TerrainProcessor";

export class FoAClient
{
    constructor()
    {
        let RemoteFunction = this.WaitForServer();

        this.ObjectsProcessor = new InterfacingObjectsProcessor(RemoteFunction);
        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
        this.TerrainProcessor = new TerrainProcessor(RemoteFunction);

        let CurrentPlayer = this.PlayerProcessor.GetCurrentPlayer().Returned ?? error("No player loaded.");

        this.Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), CurrentPlayer.FoAPlayerSettings);
        this.TerrainChunker = new TerrainFollower(this.Camera, CurrentPlayer.FoAPlayerSettings/*, this.TerrainProcessor*/);

        this.ObjectsProcessor.NewClientObject(this.Camera);
        this.ObjectsProcessor.NewClientObject(this.TerrainChunker);
    }

    PlayerProcessor: PlayerProcessor;

    Camera: FoACamera;

    TerrainProcessor: TerrainProcessor;

    TerrainChunker: TerrainFollower;

    ObjectsProcessor: InterfacingObjectsProcessor;

    WaitForServer (): RemoteFunction
    {
        let RemoteFunction = game.GetService("ReplicatedStorage").WaitForChild("API", 60) as RemoteFunction;
        return RemoteFunction;
	}
}