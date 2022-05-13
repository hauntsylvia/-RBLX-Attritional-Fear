import { FactionTitleKeys } from "../../../consts/Strings";

export class FactionArguments
{
    constructor (Name: string, Title: FactionTitleKeys, Color: Color3)
    {
        this.Name = Name;
        this.Title = Title;
        this.Color = Color;
    }

    Name: string;

    Title: FactionTitleKeys;

    Color: Color3;
}