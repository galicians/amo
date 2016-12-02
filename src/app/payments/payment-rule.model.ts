import {PaymentSource} from './payment-source.model';
import {PaymentRuleFigures} from './payment-rule-figures.model';
import {AuthMethodRule} from './authMethod.model';
import {Payment, Schedule} from './payment.model';
import * as _ from 'lodash';
import * as moment from 'moment';
// import {MomentModule} from 'angular2-moment/module';

import 'rxjs/add/operator/map';

export class PaymentRule {
	public paymentType: string;
	public allowedPaymentSources: Array<PaymentSource>;
	public notAllowedPaymentSources: Array<PaymentSource>;
	public ruleFigures: PaymentRuleFigures;
	public authMethods: Array<AuthMethodRule> = [];
	public arrearsAmount?: number;
	public sliderAmount?: number;
	public maxSlider?: number;
	public minSlider?: number;
	public balance?: number;
	public minBalance?: number;
	public WEEKS_MONTH: number = 4.3;
	public selectedFrequency?: string;
	public numPayments?: number;
	public disposableIncome?: number;
	public lastPaymentAmount?:number;
	public firstPaymentDate?: any;
	public lastPaymentDate?: any;
	public payment?: Payment;
	public auth?: string;
	public accountVO?: string;


	constructor(obj: any) {
		this.paymentType = obj.paymentType;
		this.allowedPaymentSources = obj.allowedPaymentSources;
		this.notAllowedPaymentSources = obj.notAllowedPaymentSources;
		this.ruleFigures = obj.paymentTypeRules;
		this.selectedFrequency = obj.paymentTypeRules.default_frequency;
		this.firstPaymentDate = obj.firstPaymentDate || moment()
		this.getAuthMethodRules(obj.authorizationMethodRules);
	}

	getAuthMethodRules(authorizationMethodRules: Array<AuthMethodRule>): void {
		authorizationMethodRules.map( authRule => {
			if(authRule.paymentType == this.paymentType) {
				this.authMethods.push(
				{
					allowedAuthorizationMethod: authRule.allowedAuthorizationMethod,
					paymentSources: authRule.paymentSources
				})
			}
		})
	}

	updatePaymentRules(obj: any): void {
		let updates = Object.keys(obj)

		if(obj.arrearsAmount) this.balance = obj.arrearsAmount
		
		updates.map( property => {
			if(_.isUndefined(this.ruleFigures[property])) this[property] = obj[property]
				else  this.ruleFigures[property] = obj[property]
		})
		this.calculateMinBalance()
		this.calculateMinSlider()
		this.calculateMaxSlider()
		this.calculatePayments()
	}

	calculateMinBalance() {
		// console.log('minBalance', this.ruleFigures.subscription_balance_minimum_percent, 'arrearsAmount', this.arrearsAmount)
		if(this.ruleFigures.subscription_balance_minimum_percent == 0) this.minBalance = 0
			else this.minBalance = _.round((this.arrearsAmount * this.ruleFigures.subscription_balance_minimum_percent) / 100)
	}

	validateBalance(potentialBalance): any {

		if(potentialBalance > this.arrearsAmount) return 'balance.amount.more.maxAmount'

		if(potentialBalance < this.minBalance) return 'balance.amount.less.minBalance'

		this.balance = potentialBalance
			
		return true
	}

	calculateMinSlider() {
		let minCandidates = [];
		let minAmount;

		if (this.ruleFigures.minimum_accept_commit_amount) minCandidates.push(this.ruleFigures.minimum_accept_commit_amount)
		 else {
			if(1 >= this.balance) minCandidates.push(this.balance)
				else minCandidates.push(1)
		}

		if(this.ruleFigures.minimum_accept_commit_percent) {
			minAmount = this.balance * this.ruleFigures.minimum_accept_commit_percent / 100
			minCandidates.push(_.floor(minAmount * 100) / 100)
		}

		if(this.ruleFigures.maximum_number_of_payments == 1) minCandidates.push(this.balance)

		this.minSlider = _.max(minCandidates)
	}

	calculateMaxSlider() {
		let maxCandidates = [];
		let maxAmount;


		if(this.ruleFigures.minimum_number_of_payments) {
			maxCandidates.push( this.balance - ( this.minSlider * (this.ruleFigures.minimum_number_of_payments - 1) ) ) 
		}

		if(this.ruleFigures.maximum_acceptable_payment_amount) maxCandidates.push(this.ruleFigures.maximum_acceptable_payment_amount)

		if(this.ruleFigures.maximum_acceptable_disposable_income_percent) maxCandidates.push( this.disposableIncome * (this.ruleFigures.maximum_acceptable_disposable_income_percent / 100) )

		this.maxSlider = _.min(maxCandidates)
	}



	calculatePeriod() {
		if(this.selectedFrequency == 'M') return "MONTHLY"
		if(this.selectedFrequency == 'B') return "BIWEEKLY"
		if(this.selectedFrequency == 'W') return "WEEKLY"
	}

	calculateDate(previousDate) {

		if(this.payment.paymentScheduleVOList.length == 0 ) return previousDate

		// console.log('input date', previousDate.format("YYYY-MM-DD"), 'vs previous schedule', previousSchedule)

		let monthDays = [1, 31]
		let februaryDays = [29, 30, 31]
		let specialDays = [121, 182, 274, 335]

		let previousSchedule = this.payment.paymentScheduleVOList.slice(-2)[0]

		let lastSchedule = this.payment.paymentScheduleVOList.slice(-2)[1]

		if(previousDate.isLeapYear()) specialDays = _.map(specialDays, function(n) { return n += 1 })


		if(this.selectedFrequency == 'W') return previousDate.add({days: 7})
		if(this.selectedFrequency == 'B') return previousDate.add({days: 14})
		if(this.selectedFrequency == 'M') {

			if(previousDate.dayOfYear() == 29 && previousDate.isLeapYear()) return previousDate.add({month: 1})

			if(previousDate.dayOfYear() == 30 && previousDate.isLeapYear()) return previousDate.add({days: 31})

			if(previousDate.dayOfYear() == 31 && previousDate.isLeapYear()) return previousDate.add({days: 30})


			if(previousDate.dayOfYear() == 29) return previousDate.add({days: 31})

			if(previousDate.dayOfYear() == 30) return previousDate.add({days: 30})

			if(previousDate.dayOfYear() == 31) return previousDate.add({days: 29})

			if((previousSchedule.dueDate.slice(5, 10) == '01-29') && (lastSchedule.dueDate.slice(5,10) == '03-01')) return previousDate.add({days: 28})

			if((previousSchedule.dueDate.slice(5, 10) == '01-30') && (lastSchedule.dueDate.slice(5,10) == '03-01')) return previousDate.add({days: 29})

			if((previousSchedule.dueDate.slice(5, 10) == '01-31') && (lastSchedule.dueDate.slice(5,10) == '03-01')) return previousDate.add({days: 30})


			if((previousSchedule.dueDate.slice(8, 10) == '01') && (previousDate.date() == 1)) return previousDate.add({month: 1})

			if(monthDays.indexOf(previousDate.date()) == -1) return previousDate.add({month: 1})

			if(specialDays.indexOf(previousDate.dayOfYear()) !== -1) return previousDate.add({days: 30}) 
				else return previousDate.add({days: 31})

		}

	}



	calculatePayments() {
		this.calculateNumPayments()

		let endPaymentDate;
		let tempDate = this.firstPaymentDate 
		let schedule;

		this.payment = new Payment();
		this.payment.paymentTypeRuleName = this.ruleFigures.rule_name;

		// TO DO: ATTRIBUTES & CUSTOMERACCOUNTVO SHOULD BE DYNAMIC
		this.payment.attributes = { 'auth-type': this.auth } //{ "auth-type": "SMS" }
		this.payment.customerAccountVO = { 'id': this.accountVO }

		this.payment.total = this.balance
		this.payment.period = this.calculatePeriod()


		for(let i = 0; i < this.numPayments; i++) {
			// console.log('frequency', this.calculatePeriod(), 'moment', tempDate.format("YYYY-MM-DD"))
			
			tempDate = this.calculateDate(tempDate)

			schedule = new Schedule({ amount: this.sliderAmount, dueDate: tempDate.format("YYYY-MM-DD"), status: 'NEW'})
			// console.log('schedule', schedule)

			this.payment.paymentScheduleVOList.push(schedule)

		}
		if(_.last(this.payment.paymentScheduleVOList)) _.last(this.payment.paymentScheduleVOList).amount = this.lastPaymentAmount

		// console.log('last amount', _.last(this.payment.paymentScheduleVOList), 'vs lastPaymentAmount', this.lastPaymentAmount)
		// console.log('schedules', this.payment.paymentScheduleVOList.slice(-2))

		endPaymentDate = tempDate

	}


	calculateNumPayments() {
		let numAllowedPayments;
		let regularPaymentAmount;

		this.numPayments = _.floor(this.balance / this.sliderAmount)

		if(this.ruleFigures.maximum_plan_duration_weeks) {

			if(this.selectedFrequency == 'W') numAllowedPayments = this.ruleFigures.maximum_plan_duration_weeks

			if(this.selectedFrequency == 'B') numAllowedPayments = _.ceil( (this.ruleFigures.maximum_plan_duration_weeks  / 2) ) 

			if(this.selectedFrequency == 'M') numAllowedPayments = _.ceil( (this.ruleFigures.maximum_plan_duration_weeks / this.WEEKS_MONTH) ) 

			if(this.numPayments > numAllowedPayments) this.numPayments = numAllowedPayments
			
		}

		if(this.numPayments > this.ruleFigures.maximum_number_of_payments && this.ruleFigures.maximum_number_of_payments !== 0) this.numPayments = this.ruleFigures.maximum_number_of_payments

		this.lastPaymentAmount = _.round((this.balance - (this.sliderAmount * (this.numPayments - 1))) * 100) / 100

	}

}

