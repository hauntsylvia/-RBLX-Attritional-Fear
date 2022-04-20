import { FoAFaction } from "shared/classes/in game/factions/Faction";
import { SelfFoAPlayer } from "shared/classes/in game/players/SelfFoAPlayer";
import { ServerRequest } from "shared/classes/server helpers/ServerRequest";
import { ServerResponse } from "shared/classes/server helpers/ServerResponse";
import { Strings } from "shared/consts/Strings";
import { FoAPlayerSettings } from "../../../shared/classes/in game/players/personalizations/FoAPlayerSettings";
import { TerrainRequest } from "../../../shared/classes/in game/terrain/specifics/regions/TerrainRequest";
import { TerrainHelper } from "../../../shared/classes/in game/terrain/TerrainHelper";
import { ServerDataOperationResponse } from "../../../shared/classes/server helpers/ServerDataOperationResponse";
import { Biomes } from "../../../shared/consts/Biomes";
import { Processor } from "./Processor";

export class TerrainProcessor extends Processor
{
    constructor (Instance: RemoteFunction)
    {
        super(Instance);
    }

    RenderTerrain (X: number, Z: number, ToX: number, ToZ: number, WorkerCount: number = 10): any
    {
        let TRequest = this.MakeRequest<TerrainRequest>(new ServerRequest<any>(Strings.TerrainStrings.TerrainHandlerRoute, Strings.TerrainStrings.GetMapData, undefined));
        if (TRequest.Success && TRequest.Returned !== undefined)
        {
            print(TRequest.Returned);
            let THelper = new TerrainHelper(TRequest.Returned);
            THelper.GetTerrain(X, Z, ToX, ToZ, Biomes.AllBiomes, Biomes.FallbackBiome, Biomes.ModelSize);
        }
    }
}