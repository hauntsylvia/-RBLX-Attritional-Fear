export class EnumParser
{
	static GetEnumFromString<EnumType extends EnumItem> (Name: string): EnumType | undefined
	{
		let ToReturn: EnumItem | undefined;
		Enum.GetEnums().forEach(E =>
		{
			E.GetEnumItems().forEach(EI =>
			{
				if (EI.Name === Name)
				{
					ToReturn = EI;
				}
			});
		});
		return ToReturn as EnumType | undefined;
	}
}