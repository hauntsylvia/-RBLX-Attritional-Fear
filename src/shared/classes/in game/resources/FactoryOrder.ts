export class FactoryOrder
{
	constructor (OrderTakenAt: DateTime, OrderTimeToCompletionInSeconds: number)
	{
		this.OrderTakenAt = OrderTakenAt;
		this.OrderTimeToCompletionInSeconds = OrderTimeToCompletionInSeconds;
	}

	OrderTakenAt: DateTime;

	OrderTimeToCompletionInSeconds: number;
}