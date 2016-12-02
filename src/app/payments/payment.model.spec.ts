import {Payment, Schedule} from './payment.model';


describe('Payment Model ', () => {
	let payment;
	let obj;
	let schedule;
	let paymentSource;

	beforeEach(() => {
		payment = new Payment();
		schedule = new Schedule({  
			         amount:601,
			         dueDate:"2016-11-21",
			         status:"NEW"
		      	})
		paymentSource = {  
		            id:116,
		            customerVO:{  
		               id:5
		            }
		         }
	})

	it('should have a paymentTypeRuleName', () => {
		payment.paymentTypeRuleName = 'rule.name.plan';
		expect(payment.paymentTypeRuleName).toEqual('rule.name.plan')
	})
	it('should have attributes', () => {
		payment.attributes['auth-type'] = 'SMS'
		expect(payment.attributes["auth-type"]).toEqual('SMS')
	})
	it('should have customerAccountVO', () => {
		payment.customerAccountVO.id = 5
		expect(payment.customerAccountVO)
	})
	it('should have total', () => {
		payment.total = 1000
		expect(payment.total).toEqual(1000)
	})
	it('should have a period', () => {
		payment.period = 'MONTHLY'
		expect(payment.period).toEqual('MONTHLY')
	})
	it('should have a list of paymentSchedules', ()=> {
		payment.paymentScheduleVOList.push(schedule)
		expect(payment.paymentScheduleVOList[0]).toEqual(schedule)
	})
	it('should have a wallet associated with payment sources', () => {
		payment.paymentPlanWalletVOList.push(paymentSource)
		expect(payment.paymentPlanWalletVOList[0]).toEqual(paymentSource)
	})
})