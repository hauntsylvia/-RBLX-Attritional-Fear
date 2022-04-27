import { ResourceTypes } from "../../../consts/Enums";
import { Resource } from "./specifics/Resource";

export class StorageContainer
{
	constructor (MaxResourceHold: Resource[], CurrentResources: Resource[], MaxVesselHold: number = 0)
	{
		this.MaxResourceHold = MaxResourceHold;
		this.CurrentResources = CurrentResources;
		this.MaxVesselHold = MaxVesselHold;
	}

	MaxResourceHold: Resource[];

	CurrentResources: Resource[];

	MaxVesselHold: number;

	static AddResourcesToPool (Pool: Resource[], Add: Resource[]): Resource[]
	{
		let R: Resource[] = Pool;
		Add.forEach(ToPush =>
		{
			R.push(ToPush);
		});
		return R;
	}

	static ContainsResources (Types: ResourceTypes[], Contains: Resource[], ResourcesToCheckAgainst: Resource[]): boolean
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

	static GetResourcesOfType (T: ResourceTypes, Resources: Resource[]): Resource[]
	{
		return Resources.filter(R => R.TypeOfResource === T);
	}

	static GetTotalWeightByType (T: ResourceTypes, Resources: Resource[]): number
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