import {PaymentRuleFigures} from './payment-rule-figures.model';

describe('PaymentRuleFigures model', () => {

	let paymentRuleFigures;
	let obj;

	beforeEach(() => {
		obj = {   
		      grace_days:0,
		      minimum_accept_payment_percent:100.0,
		      rule_number:2,
		      maximum_plan_duration_weeks:0,
		      minimum_payment_interval_days:0,
		      minimum_accept_commit_percent:0.0,
		      default_frequency:null,
		      direct_debit_start_interval_days:10,
		      account_status:null,
		      subscription_balance_minimum_percent:0.0,
		      maximum_acceptable_payment_amount:0.0,
		      product:null,
		      balance:null,
		      maximum_number_of_payments:1,
		      minimum_accept_overlimit_percent:0.0,
		      minimum_number_of_payments:1,
		      maximum_acceptable_disposable_income_percent:0.0,
		      acceptable_payment_channels:"CREDIT_CARD, DEBIT_CARD",
		      maximum_payment_interval_days:0,
		      minimum_accept_commit_amount:1.0,
		      rule_name:"rule.name.pay.now"
		   }

		paymentRuleFigures = new PaymentRuleFigures(obj)
	})

	it('should have a paymentType', ()=> {
		expect(paymentRuleFigures.grace_days).toEqual(0)
	});
	it('should have a minimum_accept_payment_percent', ()=> {
		expect(paymentRuleFigures.minimum_accept_payment_percent).toEqual(100)
	});
	it('should have a rule_number', ()=> {
		expect(paymentRuleFigures.rule_number).toEqual(2)
	});
	it('should have a maximum_plan_duration_weeks', ()=> {
		expect(paymentRuleFigures.maximum_plan_duration_weeks).toEqual(0)
	});
	it('should have a minimum_payment_interval_days', ()=> {
		expect(paymentRuleFigures.minimum_payment_interval_days).toEqual(0)
	});
	it('should have a minimum_accept_commit_percent', ()=> {
		expect(paymentRuleFigures.minimum_accept_commit_percent).toEqual(0)
	});
	it('should have a default_frequency', ()=> {
		expect(paymentRuleFigures.default_frequency).toEqual(null)
	});
	it('should have a direct_debit_start_interval_days', ()=> {
		expect(paymentRuleFigures.direct_debit_start_interval_days).toEqual(10)
	});
	it('should have a account_status', ()=> {
		expect(paymentRuleFigures.account_status).toEqual(null)
	});
	it('should have a subscription_balance_minimum_percent', ()=> {
		expect(paymentRuleFigures.subscription_balance_minimum_percent).toEqual(0)
	});
	it('should have a maximum_acceptable_payment_amount', ()=> {
		expect(paymentRuleFigures.maximum_acceptable_payment_amount).toEqual(0)
	});
	it('should have a product', ()=> {
		expect(paymentRuleFigures.product).toEqual(null)
	});
	it('should have a balance', ()=> {
		expect(paymentRuleFigures.balance).toEqual(null)
	});
	it('should have a maximum_number_of_payments', ()=> {
		expect(paymentRuleFigures.maximum_number_of_payments).toEqual(1)
	});
	it('should have a minimum_accept_overlimit_percent', ()=> {
		expect(paymentRuleFigures.minimum_accept_overlimit_percent).toEqual(0)
	});
	it('should have a minimum_number_of_payments', ()=> {
		expect(paymentRuleFigures.minimum_number_of_payments).toEqual(1)
	});
	it('should have a maximum_acceptable_disposable_income_percent', ()=> {
		expect(paymentRuleFigures.maximum_acceptable_disposable_income_percent).toEqual(0)
	});
	it('should have a acceptable_payment_channels', ()=> {
		expect(paymentRuleFigures.acceptable_payment_channels).toEqual("CREDIT_CARD, DEBIT_CARD")
	});
	it('should have a maximum_payment_interval_days', ()=> {
		expect(paymentRuleFigures.maximum_payment_interval_days).toEqual(0)
	});
	it('should have a minimum_accept_commit_amount', ()=> {
		expect(paymentRuleFigures.minimum_accept_commit_amount).toEqual(1)
	});
	it('should have a rule_name', ()=> {
		expect(paymentRuleFigures.rule_name).toEqual("rule.name.pay.now")
	});

});