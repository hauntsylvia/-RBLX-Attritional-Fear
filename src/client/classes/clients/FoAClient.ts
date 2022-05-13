import { TerrainFollower } from "../../../shared/classes/in game/terrain/TerrainFollower";
import { Strings } from "../../../shared/consts/Strings";
import { FoACamera } from "../camera/FoACamera";
import { LevelOfZoom } from "../camera/LevelOfZoom";
import { FactionModifiedJobHandler } from "../processor classes/server job handlers/FactionModifiedJobHandler";
import { ServerJobHandler } from "../processor classes/server job handlers/ServerJobHandler";
import { VesselCreationHandler } from "../processor classes/server job handlers/VesselCreationHandler";
import { VesselMovementHandler } from "../processor classes/server job handlers/VesselMovementHandler";
import { EntityProcessor } from "../processors/EntityProcessor";
import { InterfacingObjectsProcessor } from "../processors/InterfacingObjectsProcessor";
import { PlayerProcessor } from "../processors/PlayerProcessor";
import { ServerJobProcessor } from "../processors/ServerJobProcessor";
import { TerrainProcessor } from "../processors/TerrainProcessor";
import { VesselProcessor } from "../processors/VesselProcessor";

export class FoAClient
{
    constructor()
    {
        let ServerAPIStuff = FoAClient.WaitForServer();
        let RemoteFunction = ServerAPIStuff[0];
        let RemoteEvent = ServerAPIStuff[1];

        this.ObjectsProcessor = new InterfacingObjectsProcessor(RemoteFunction);
        this.PlayerProcessor = new PlayerProcessor(RemoteFunction);
        this.TerrainProcessor = new TerrainProcessor(RemoteFunction);

        let CurrentPlayer = this.PlayerProcessor.GetCurrentPlayer().Returned ?? error("No player loaded.");
        this.Camera = new FoACamera(new LevelOfZoom(game.GetService("Workspace").FindFirstChildOfClass("Model") as Model, 500, 60), CurrentPlayer.FoAPlayerSettings);

        this.TerrainChunker = new TerrainFollower(this.Camera, CurrentPlayer.FoAPlayerSettings, this.TerrainProcessor);
        this.EntitiesProcessor = new EntityProcessor(RemoteFunction);
        this.VesselProcessor = new VesselProcessor(RemoteFunction);
        this.ServerJobProcessor = new ServerJobProcessor(RemoteFunction, RemoteEvent);

        this.ObjectsProcessor.NewClientObject(this.Camera);
        this.ObjectsProcessor.NewClientObject(this.TerrainChunker);

        this.RegisterJobHandlers();
    }

    PlayerProcessor: PlayerProcessor;

    Camera: FoACamera;

    TerrainProcessor: TerrainProcessor;

    TerrainChunker: TerrainFollower;

    ObjectsProcessor: InterfacingObjectsProcessor;

    EntitiesProcessor: EntityProcessor;

    VesselProcessor: VesselProcessor;

    ServerJobProcessor: ServerJobProcessor;

    RegisterJobHandlers ()
    {
        this.ServerJobProcessor.StartDispatching();
        let ToR: ServerJobHandler<any>[] =
            [
                new VesselMovementHandler(this),
                new VesselCreationHandler(this),
                new FactionModifiedJobHandler(this),
            ];
        ToR.forEach(R =>
        {
            this.ServerJobProcessor.RegisterHandler(R);
        });
	}

    static WaitForServer (): [RemoteFunction, RemoteEvent]
    {
        let RemoteFunction = game.GetService("ReplicatedStorage").WaitForChild(Strings.ServerAPIStrings.APIInstanceName) as RemoteFunction;
        let RemoteEvent = game.GetService("ReplicatedStorage").WaitForChild(Strings.ServerAPIStrings.APIReplicatorName) as RemoteEvent;
        return [RemoteFunction, RemoteEvent];
    }
}