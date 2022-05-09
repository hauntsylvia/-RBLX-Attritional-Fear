import { TerrainFollower } from "../../../shared/classes/in game/terrain/TerrainFollower";
import { Strings } from "../../../shared/consts/Strings";
import { FoACamera } from "../camera/FoACamera";
import { LevelOfZoom } from "../camera/LevelOfZoom";
import { InterfacingObjectsProcessor } from "../processors/InterfacingObjectsProcessor";
import { PlayerProcessor } from "../processors/PlayerProcessor";
import { TerrainProcessor } from "../processors/TerrainProcessor";

export class FoAClient
{
    constructor()
    {
        let ServerAPIStuff = this.WaitForServer();
        let RemoteFunction = ServerAPIStuff[0];
        let RemoteEvent = ServerAPIStuff[1];

        this.ObjectsProcessor = new InterfacingObjectsProcessor(RemoteFunction);
        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
        this.TerrainProcessor = new TerrainProcessor(RemoteFunction);

        let CurrentPlayer = this.PlayerProcessor.GetCurrentPlayer().Returned ?? error("No player loaded.");

        this.Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), CurrentPlayer.FoAPlayerSettings);
        this.TerrainChunker = new TerrainFollower(this.Camera, CurrentPlayer.FoAPlayerSettings, this.TerrainProcessor);

        this.ObjectsProcessor.NewClientObject(this.Camera);
        this.ObjectsProcessor.NewClientObject(this.TerrainChunker);
    }

    PlayerProcessor: PlayerProcessor;

    Camera: FoACamera;

    TerrainProcessor: TerrainProcessor;

    TerrainChunker: TerrainFollower;

    ObjectsProcessor: InterfacingObjectsProcessor;

    WaitForServer (): [RemoteFunction, RemoteEvent]
    {
        let RemoteFunction = game.GetService("ReplicatedStorage").WaitForChild(Strings.ServerAPIStrings.APIInstanceName, 60) as RemoteFunction;
        let RemoteEvent = game.GetService("ReplicatedStorage").WaitForChild(Strings.ServerAPIStrings.APIReplicatorName, 60) as RemoteEvent;
        return [RemoteFunction, RemoteEvent];
    }
}