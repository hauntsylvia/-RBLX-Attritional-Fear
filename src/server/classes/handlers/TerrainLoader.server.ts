import { Server } from "server/classes/server communication/Server";
import { Endpoint } from "server/classes/server communication/Endpoint";
import { Handler } from "server/classes/server communication/Handler";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Registers } from "../../../shared/consts/Registers";
import { Record } from "../modules/Record";
import { TerrainHelper } from "../../../shared/classes/in game/terrain/TerrainHelper";
import { Biome } from "../../../shared/classes/in game/terrain/specifics/biomes/Biome";
import { BiomeTypes, TreeTypes } from "../../../shared/consts/Enums";
import { Tree } from "../../../shared/classes/in game/terrain/specifics/objects/Tree";
import { Church } from "../../../shared/classes/in game/terrain/specifics/objects/Church";
import { TerrainResult } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainResult";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { NoiseHelper } from "../../../shared/classes/in game/terrain/NoiseHelper";
import { Biomes } from "../../../shared/consts/Biomes";


let R = new Random();
let NHelper = new NoiseHelper(1000, 1000);
let ElevationMap = NHelper.GenerateHeightmap(R.NextInteger(1, 10e6), 2);
let MoistureMap = NHelper.GenerateHeightmap(R.NextInteger(1, 10e6), 2);
let TempMap = NHelper.GenerateHeightmap(R.NextInteger(1, 10e6), 1);

const THelper = new TerrainHelper(new TerrainRequest(ElevationMap, MoistureMap, TempMap, 5, 0.2))

function PlayerWantsMap (Player: Player): TerrainRequest
{
	return THelper.TerrainReq;
}

const ThisHandler = new Handler(Strings.TerrainStrings.TerrainHandlerRoute,
	[
		new Endpoint<unknown, TerrainRequest>(Strings.TerrainStrings.GetMap, PlayerWantsMap)
    ]);


Server.RegisterHandler(ThisHandler);

export { };