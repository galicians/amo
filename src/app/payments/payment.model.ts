export class Payment {
	public paymentTypeRuleName: string;
	public attributes: Object = {};
	public customerAccountVO: Object = {};
	public total: number;
	public period: string;
	public paymentScheduleVOList: Array<Schedule> = [];
	public paymentPlanWalletVOList: Array<Object> = [];
}

export class Schedule {
	public amount: number;
	public dueDate: string;
	public status: string;

	constructor(obj: any) {
		this.amount = obj.amount;
		this.dueDate = obj.dueDate;
		this.status = obj.status;
	}
}

