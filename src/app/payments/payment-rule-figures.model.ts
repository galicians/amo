
export class PaymentRuleFigures {
	public grace_days: number;
	public minimum_accept_payment_percent: number;
	public rule_number: number;
	public maximum_plan_duration_weeks: number;
	public minimum_payment_interval_days: number;
	public minimum_accept_commit_percent: number;
	public default_frequency: number;
	public direct_debit_start_interval_days: number;
	public account_status: number;
	public subscription_balance_minimum_percent: number;
	public maximum_acceptable_payment_amount: number;
	public product: string;
	public balance: number;
	public maximum_number_of_payments: number;
	public minimum_accept_overlimit_percent: number;
	public minimum_number_of_payments: number;
	public maximum_acceptable_disposable_income_percent: number;
	public acceptable_payment_channels: string;
	public maximum_payment_interval_days: number;
	public minimum_accept_commit_amount: number;
	public rule_name: string;

	constructor(obj: any) {
		this.grace_days = obj.grace_days;
		this.minimum_accept_payment_percent = obj.minimum_accept_payment_percent;
		this.rule_number = obj.rule_number;
		this.maximum_plan_duration_weeks = obj.maximum_plan_duration_weeks
		this.minimum_payment_interval_days = obj.minimum_payment_interval_days;
		this.minimum_accept_commit_percent = obj.minimum_accept_commit_percent;
		this.default_frequency = obj.default_frequency;
		this.direct_debit_start_interval_days = obj.direct_debit_start_interval_days;
		this.account_status = obj.account_status;
		this.subscription_balance_minimum_percent = obj.subscription_balance_minimum_percent;
		this.maximum_acceptable_payment_amount = obj.maximum_acceptable_payment_amount;
		this.product = obj.product;
		this.balance = obj.balance;
		this.maximum_number_of_payments = obj.maximum_number_of_payments;
		this.minimum_accept_overlimit_percent = obj.minimum_accept_overlimit_percent;
		this.minimum_number_of_payments = obj.minimum_number_of_payments;
		this.maximum_acceptable_disposable_income_percent = obj.maximum_acceptable_disposable_income_percent;
		this.acceptable_payment_channels = obj.acceptable_payment_channels;
		this.maximum_acceptable_disposable_income_percent = obj.maximum_acceptable_disposable_income_percent;
		this.acceptable_payment_channels = obj.acceptable_payment_channels;
		this.maximum_payment_interval_days = obj.maximum_payment_interval_days;
		this.minimum_accept_commit_amount = obj.minimum_accept_commit_amount;
		this.rule_name = obj.rule_name;
	}
}


