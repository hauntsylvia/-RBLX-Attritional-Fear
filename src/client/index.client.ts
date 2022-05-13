import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
import { FactionArguments } from "../shared/classes/in game/factions/FactionArguments";
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

const Client = new FoAClient();
let Self = Client.PlayerProcessor.GetCurrentPlayer();
Client.PlayerProcessor.SaveFoAPlayerSettings(new FoAPlayerSettings(), Client.ObjectsProcessor);
if (Self.Success && Self.Returned !== undefined)
{
	let Faction = Client.PlayerProcessor.RegisterFactionToGame(new FactionArguments("Melancholic", FactionTitleKeys.AirTraverser, Color3.fromRGB(0, 0, 0)));
	if (Faction.Success && Faction.Returned !== undefined)
	{
		Client.Camera.Connect();

		let SpawnLoc = Faction.Returned.SpawnLocation;

		Client.Camera.MoveCamera(SpawnLoc);

		let RenderAmount = 20;
		let StartPos = new Vector2((SpawnLoc.X - RenderAmount), (SpawnLoc.Z - RenderAmount));
		let EndPos = new Vector2((SpawnLoc.X + RenderAmount), (SpawnLoc.Z + RenderAmount));
		let R = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(StartPos.X, StartPos.Y, EndPos.X, EndPos.Y), 240, 1);
		let MakeVessel = Client.VesselProcessor.TryToMakeVessel(new StuffOnRoundStart(Self.Returned).StartingVessels[0]);
		if (MakeVessel.Success && MakeVessel.Returned !== undefined)
		{
			print("Moving vessel for everyone . . .");
			let VesselMoveRequest = Client.VesselProcessor.TryToMoveVessel(MakeVessel.Returned, new Vector3(100, 100, 100), 1);
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