import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { Server } from "../server/classes/server communication/Server";
import { SelfFoAFaction } from "../shared/classes/in game/factions/SelfFoAFaction";
import { FoAPlayerSettings } from "../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { Hotkeys } from "../shared/classes/in game/players/personalizations/specifics/Hotkeys";
import { ServerTerrainRequest } from "../shared/classes/in game/terrain/specifics/regions/ServerTerrainRequest";
import { TerrainFollower } from "../shared/classes/in game/terrain/TerrainFollower";
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
print(Self.Success);
if (Self.Success && Self.Returned !== undefined)
{
	print("Registering faction . .");
	let Faction = Client.PlayerProcessor.RegisterFactionToGame(new SelfFoAFaction(Self.Returned, Self.Returned.RobloxPlayerInstance.UserId, "Abc", new Vector3(), FactionTitleKeys.Dreadful, Color3.fromRGB(255, 180, 255), [], [], []));
	if (Faction.Success && Faction.Returned !== undefined)
	{
		print("Faction registered.");

		Client.Camera.Connect();

		let SpawnLoc = Faction.Returned.SpawnLocation;

		Client.Camera.MoveCamera(SpawnLoc);

		let RenderAmount = 1000;
		let StartPos = new Vector2((SpawnLoc.X - RenderAmount), (SpawnLoc.Z - RenderAmount));
		let EndPos = new Vector2((SpawnLoc.X + RenderAmount), (SpawnLoc.Z + RenderAmount));
		let R = Client.TerrainProcessor.RenderTerrain(new ServerTerrainRequest(StartPos.X, StartPos.Y, EndPos.X, EndPos.Y), 240, 1);
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