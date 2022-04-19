export class ModelResizer
{
	static ScaleModel (Model: Model, Scale: number): Model
	{
		let Primary = Model.PrimaryPart;
		if (Primary !== undefined)
		{
			let PrimaryCF = Primary.CFrame;
			Model.GetDescendants().forEach(D =>
			{
				if (D.IsA("BasePart"))
				{
					D.Size = D.Size.mul(Scale);
					if (D !== Primary)
					{
						let A = PrimaryCF.Inverse().mul(D.Position).mul(Scale);
						let B = PrimaryCF.add(A);
						D.CFrame = B;
					}
				}
			});
		}
		return Model;
	}
}