import { StorableType } from "../../../consts/Enums";
import { Storable } from "./specifics/Resource";

export class StorageContainer
{
	constructor (VolumeCubicMeters: number, CurrentResources: Storable[])
	{
		this.VolumeCubicMeters = VolumeCubicMeters;
		this.CurrentResources = CurrentResources;
	}

	VolumeCubicMeters: number;

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
			let WeightOfCheckingResource = StorageContainer.GetTotalVolumeByType(T, Contains);
			let WeightOfResourceInStorage = StorageContainer.GetTotalVolumeByType(T, ResourcesToCheckAgainst);
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

	static GetTotalVolumeByType (T: StorableType, Resources: Storable[]): number
	{
		let TotalVolumeOfResource = 0;
		let AllResourcesOfType = StorageContainer.GetResourcesOfType(T, Resources);
		AllResourcesOfType.forEach(ARoT =>
		{
			TotalVolumeOfResource += Storable.GetVolumeInCubicMeters(ARoT);
		});
		return TotalVolumeOfResource;
	}
}