import { Biomes } from "../../../../../consts/Enums";
import { ITerrainObject } from "./ITerrainObject";

export class Tree implements ITerrainObject
{
	constructor (TreeModel: number, YOffset: number)
	{
		let Children = game.GetService("ServerStorage").FindFirstChild("Biomes")?.FindFirstChild("Forest")?.GetChildren();
		if (Children !== undefined)
		{
			this.Model = Children[TreeModel] as Model;
		}
		else
		{
			error("", 1);
		}
		this.YOffset = YOffset;
	}
	BiomesAndRarity: Map<Biomes, number> = new Map<Biomes, number>([[Biomes.Forest, 0.1]]);
	Model: Model;
	YOffset: number;
}