import { CrewMember } from "../vessels/CrewMember";

export class FactoryOrder
{
	constructor (OrderTakenAt: DateTime, OrderTimeToCompletionInSeconds: number, TakenBy: CrewMember[])
	{
		this.OrderTakenAt = OrderTakenAt;
		this.OrderTimeToCompletionInSeconds = OrderTimeToCompletionInSeconds;
		this.TakenBy = TakenBy;
	}

	OrderTakenAt: DateTime;

	OrderTimeToCompletionInSeconds: number;

	TakenBy: CrewMember[];
}