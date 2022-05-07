import { MetricPrefixes, ResourceType } from "../../../consts/Enums";
import { Geometry } from "../../util/Measurements/Geometry";
import { Mass } from "../../util/Measurements/Mass";
import { Volume } from "../../util/Measurements/Volume";
import { Storable } from "./specifics/Resource";

export class StorageContainer
{
	constructor (CurrentResources: Storable[], Geometry: Geometry)
	{
		this.CurrentResources = CurrentResources;
		this.Geometry = Geometry;
	}

	private CurrentResources: Storable[];

	private Geometry: Geometry;

	/**
	 * Returns the current pool with the added resources. Doesn't add them if the geometry's volume of a resource is greater than the volume of the storage container's geometry.
	 * @param Pool	The pool to modify.
	 * @param Add	The resources to add to the pool.
	 */
	static AddResourcesToPool (Units: MetricPrefixes, Pool: Storable[], Add: Storable[]): Storable[]
	{
		let R: Storable[] = Pool;
		Add.forEach(ToPush =>
		{
			if (Geometry.GetVolumeOfGeometry(Units, ToPush.Geometry).CubicVolume <= StorageContainer.GetTotalVolumeOfType(Units, Pool).CubicVolume)
			{
				R.push(ToPush);
			}
		});
		return R;
	}

	/**
	 * Returns all resources of the given type.
	 * @param T The type of resource that should be returned.
	 * @param Pool The pool of resources to filter through.
	 */
	static GetResourcesOfType (Pool: Storable[], T?: ResourceType): Storable[]
	{
		return T !== undefined ? Pool.filter(R => R.TypeOfStorable === T) : Pool;
	}

	/**
	 * Returns the total volume of the given pool by resource type.
	 * @param T The type of resource that should be included in the total volume. If undefined, this method checks the full volume of the given pool.
	 * @param Pool
	 */
	static GetTotalVolumeOfType (Units: MetricPrefixes, Pool: Storable[], T?: ResourceType): Volume
	{
		let TotalVolumeOfResources = 0;
		let AllResourcesOfType = T !== undefined ? StorageContainer.GetResourcesOfType(Pool, T) : Pool;
		AllResourcesOfType.forEach(ARoT =>
		{
			TotalVolumeOfResources += Geometry.GetVolumeOfGeometry(Units, ARoT.Geometry).CubicVolume;
		});
		return new Volume(Units, TotalVolumeOfResources);
	}

	/**
	 * Returns the total mass of the given pool by resource type.
	 * @param T The type of resource that should be included in the total mass. If undefined, this method checks the full mass of the given pool.
	 * @param Pool
	 */
	static GetTotalMassOfType (Units: MetricPrefixes, Pool: Storable[], T?: ResourceType): Mass
	{
		let TotalMass = 0;
		let AllResourcesOfType = T !== undefined ? StorageContainer.GetResourcesOfType(Pool, T) : Pool;
		AllResourcesOfType.forEach(ARoT =>
		{
			TotalMass += Geometry.GetMass(Units, ARoT.Geometry).Weight;
		});
		return new Mass(Units, TotalMass);
	}
}