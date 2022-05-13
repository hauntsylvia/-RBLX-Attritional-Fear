export enum BiomeType
{
	Ocean,
	Forest,
	SnowForest,
	Beach,
	Lake,
	MountainTop
};

export enum TreeType
{
	Tree1,
	Tree2,
	Tree3,
	SnowTree1
}

export enum ResourceType
{
	SteelAlloy,
	Munition,
	Food,
	Iron,
	Oil,
	Water,
	Wood,

	Vessel
}

export enum PartType
{
	VesselFrame = "Vessel Frame",
	Engine = "Engine",
	FuelTank = "Fuel Tank",
	NavBridge = "Navigation Bridge",
	CrewQ = "Crew Quarters",

	CargoHold = "Cargo Hold",
	Armament = "Armament",
}

export enum BuildingVisuals
{
	Default = "Default",
}

export enum BuildingTypes
{
	Hangar = "Hangar",
	HQ = "Headquarters",
	MassProductionFacility = "Mass Production Facility",
	OilDrillingRig = "Oil Drilling Rig",
	ProductionFacility = "Production Facility",
	StaticArtilleryHouse = "Static Artillery House",
	StoreHouse = "Store House",
	VesselManufacturingFacility = "Vessel Manufacturing Facility",
	VesselPlanningFacility = "Vessel Planning Facility",
}

export enum Species
{
	Vessel,
	Human
}

export enum MetricUnits
{
	Kilo = 1000,
	Hecto = 100,
	Deca = 10,
	Base = 1,
	Deci = 0.1,
	Centi = 0.01,
	Milli = 0.001,

	RobloxStud = 3.572,
}

export enum TimeUnits
{
	Hour = 3600,
	Minute = 60,
	Second = 1,
}

/** Items representing different jobs the client is expected to do upon request of the server. */
export enum ServerJobSpecifications
{
	/** Indicates that the returned object in the replicator job is one containing vessel positional data. */
	VesselMove,

	/** Indicates that the returned object in the replicator job is one containing vessel information due to a newly created vessel. */
	VesselCreated,

	/** Indicates that the returned object in the replicator job is one containing data of a new player that has registered a faction. */
	NewFactionInGame,

	/** Indicates that the returned object in the replicator job is one containing data of any player constructing a building successfully. */
	NewBuildingConstructedInGame,
}