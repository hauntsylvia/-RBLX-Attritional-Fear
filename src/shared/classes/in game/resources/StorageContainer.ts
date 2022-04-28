import { StorableType } from "../../../consts/Enums";
import { Storable } from "./specifics/Resource";

export class StorageContainer
{
	constructor (MaxResourceHold: Storable[], CurrentResources: Storable[])
	{
		this.MaxResourceHold = MaxResourceHold;
		this.CurrentResources = CurrentResources;
	}

	MaxResourceHold: Storable[];

	CurrentResources: Storable[];

	static AddResourcesToPool (Pool: Storable[], Add: Storable[]): Storable[]
	{
		let R: Storable[] = Pool;
		Add.forEach(ToPush =>
		{
			R.push(ToPush);
		});
		return R;
	}

	static ContainsResources (Types: StorableType[], Contains: Storable[], ResourcesToCheckAgainst: Storable[]): boolean
	{
		let ToRet = false;
		Types.forEach(T =>
		{
			let WeightOfCheckingResource = StorageContainer.GetTotalWeightByType(T, Contains);
			let WeightOfResourceInStorage = StorageContainer.GetTotalWeightByType(T, ResourcesToCheckAgainst);
			if (WeightOfResourceInStorage >= WeightOfCheckingResource)
			{
				ToRet = true;
			}
		});
		return ToRet;
	}

	static GetResourcesOfType (T: StorableType, Resources: Storable[]): Storable[]
	{
		return Resources.filter(R => R.TypeOfStorable === T);
	}

	static GetTotalWeightByType (T: StorableType, Resources: Storable[]): number
	{
		let TotalWeightOfCurrentResource = 0;
		let AllResourcesOfType = StorageContainer.GetResourcesOfType(T, Resources);
		AllResourcesOfType.forEach(ARoT =>
		{
			TotalWeightOfCurrentResource += ARoT.WeightInKG;
		});
		return TotalWeightOfCurrentResource;
	}
}