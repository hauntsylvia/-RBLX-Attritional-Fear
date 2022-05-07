import { ResourceType } from "../../../consts/Enums";
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

	/**
	 * Returns the current pool with the added resources.
	 * @param Pool	The pool to modify.
	 * @param Add	The resources to add to the pool.
	 */
	static AddResourcesToPool (Pool: Storable[], Add: Storable[]): Storable[]
	{
		let R: Storable[] = Pool;
		Add.forEach(ToPush =>
		{
			R.push(ToPush);
		});
		return R;
	}

	/**
	 * Returns true if the volume of all types is greater than or equal to the given resources.
	 * @param Types Indicates all types of resources to check the volume of.
	 * @param Pool	The current pool of resources.
	 * @param ResourcesToCheckAgainst The resources to check the volume of in the pool.
	 */
	static ContainsResources (Types: ResourceType[], Pool: Storable[], ResourcesToCheckAgainst: Storable[]): boolean
	{
		let ToRet = false;
		Types.forEach(T =>
		{
			let WeightOfCheckingResource = StorageContainer.GetTotalVolumeByType(Pool, T);
			let WeightOfResourceInStorage = StorageContainer.GetTotalVolumeByType(ResourcesToCheckAgainst, T);
			if (WeightOfResourceInStorage >= WeightOfCheckingResource)
			{
				ToRet = true;
			}
		});
		return ToRet;
	}

	/**
	 * Returns all resources of the given type.
	 * @param T The type of resource that should be returned.
	 * @param Pool The pool of resources to filter through.
	 */
	static GetResourcesOfType (Pool: Storable[], T: ResourceType): Storable[]
	{
		return Pool.filter(R => R.TypeOfStorable === T);
	}

	/**
	 * Returns the total volume of the given pool by resource type.
	 * @param T The type of resource that should be included in the total volume. If undefined, this method checks the full volume of the given pool.
	 * @param Pool
	 */
	static GetTotalVolumeByType (Pool: Storable[], T?: ResourceType): number
	{
		let TotalVolumeOfResource = 0;
		let AllResourcesOfType = T !== undefined ? StorageContainer.GetResourcesOfType(Pool, T) : Pool;
		AllResourcesOfType.forEach(ARoT =>
		{
			TotalVolumeOfResource += Storable.GetVolumeInCubicMeters(ARoT);
		});
		return TotalVolumeOfResource;
	}
}