import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
import { SelfFoAFaction } from "../shared/classes/in game/factions/SelfFoAFaction";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { ServerTerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { TerrainFollower } from "../shared/classes/in game/terrain/TerrainFollower";
import { Vessel } from "../shared/classes/in game/vessels/Vessel";
import { StuffOnRoundStart } from "../shared/consts/in game/factions/StuffOnRoundStart";
import { FactionTitleKeys } from "../shared/consts/Strings";
import { FoACamera } from "./classes/camera/FoACamera";
import { LevelOfZoom } from "./classes/camera/LevelOfZoom";
import { FoAClient } from "./classes/clients/FoAClient";
import { RenderTerrainResult } from "./classes/processor classes/RenderTerrainResult";

print("Constructing client . .");
const Client = new FoAClient();
print("Client constructed.");
let Self = Client.PlayerProcessor.GetCurrentPlayer();
Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(), Client.ObjectsProcessor);
if (Self.Success && Self.Returned !== undefined)
{
	print("Registering faction . .");
	/* 
Vessel.ChangeVesselThrottles(V, 1, 0);
Vessel.MoveVesselTo(V, new Vector3(100, 100, 100));
	 */

	let Faction = Client.PlayerProcessor.RegisterFactionToGame(new SelfFoAFaction(Self.Returned, Self.Returned.RobloxPlayerInstance.UserId, "Abc", new Vector3(), FactionTitleKeys.Dreadful, Color3.fromRGB(255, 180, 255), [], [], []));
	if (Faction.Success && Faction.Returned !== undefined)
	{
		print("Faction registered.");

		Client.Camera.Connect();

		print("Camera connected.");

		let SpawnLoc = Faction.Returned.SpawnLocation;

		Client.Camera.MoveCamera(SpawnLoc);

		let RenderAmount = 20;
		let StartPos = new Vector2((SpawnLoc.X - RenderAmount), (SpawnLoc.Z - RenderAmount));
		let EndPos = new Vector2((SpawnLoc.X + RenderAmount), (SpawnLoc.Z + RenderAmount));
		let R = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(StartPos.X, StartPos.Y, EndPos.X, EndPos.Y), 240, 1);
		print("Asking for vessel . . .");
		let MakeVessel = Client.VesselProcessor.TryToMakeVessel(new StuffOnRoundStart(Self.Returned).StartingVessels[0]);
		print("Vessel request processed.");
		if (MakeVessel.Success && MakeVessel.Returned !== undefined)
		{
			print("Moving vessel for everyone . . .");
			let VesselMoveRequest = Client.VesselProcessor.TryToMoveVessel(MakeVessel.Returned, new Vector3(100, 100, 100));
			print(VesselMoveRequest.Returned !== undefined && VesselMoveRequest.Returned ? "Successfully moved vessel!" : "Vessel did not move.");
		}
		else
		{
			print("No v!");
		}
	}
	else
	{
		print("Faction could not be registered.");
	}
}
else
{
	print("No self player.");
}

export {};