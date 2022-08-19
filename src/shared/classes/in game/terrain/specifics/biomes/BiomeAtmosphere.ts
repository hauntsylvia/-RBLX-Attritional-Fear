export class BiomeAtmosphere
{
	constructor (Color: Color3, Decay: Color3, Glare: number, Haze: number, RawBrightness: number, AtmosphereDensity: number)
	{
		this.Color = Color;
		this.Decay = Decay;
		this.Glare = Glare;
		this.Haze = Haze;
		this.RawBrightness = RawBrightness;
		this.AtmosphereDensity = AtmosphereDensity;
	}

	private Color: Color3;

	private Decay: Color3;

	private Glare: number;

	private Haze: number;

	private RawBrightness: number;

	private AtmosphereDensity: number;

	public GetLighting (L: Lighting): [Atmosphere | undefined, Sky | undefined]
	{
		let AtmAndSky: [Atmosphere | undefined, Sky | undefined] = [undefined, undefined];
		L.GetChildren().forEach(Child =>
		{
			if (AtmAndSky[0] !== undefined && AtmAndSky[1] !== undefined)
			{
				// break;
			}
			else if (Child.IsA("Atmosphere"))
			{
				AtmAndSky[0] = Child;
			}
			else if (Child.IsA("Sky"))
			{
				AtmAndSky[1] = Child;
			}
		});
		return AtmAndSky;
	}

	public ChangeLighting (): void
	{
		let Lighting = game.GetService("Lighting");
		let AtmAndSky = this.GetLighting(Lighting);
		if (AtmAndSky[0] !== undefined)
		{
			AtmAndSky[0].Color = this.Color;
			AtmAndSky[0].Decay = this.Decay;
			AtmAndSky[0].Glare = this.Glare;
			AtmAndSky[0].Haze = this.Haze;
			AtmAndSky[0].Density = this.AtmosphereDensity;
		}
		if (AtmAndSky[1] !== undefined)
		{
			AtmAndSky[1];
		}
		if (Lighting !== undefined)
		{
			Lighting.Brightness = this.RawBrightness;
		}
	}
}

export class BiomeAtmospherePresets
{
	public static DeepGrunge: BiomeAtmosphere = new BiomeAtmosphere(
		Color3.fromRGB(135, 134, 107),
		Color3.fromRGB(105, 105, 116),
		0.3,
		10,
		1,
		0.22);

	public static WhiteGrunge: BiomeAtmosphere = new BiomeAtmosphere(
		Color3.fromRGB(181, 184, 168),
		Color3.fromRGB(180, 180, 200),
		0.3,
		10,
		1,
		0.22);
}