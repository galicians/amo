import {PaymentRule} from './payment-rule.model';
import * as moment from 'moment';
import * as _ from 'lodash';

describe('Payment Rule Model', () => {

	let paymentPlan;
	let obj;

	beforeEach(() => {
		obj = {
			paymentType: 'PLAN',
			allowedPaymentSources: [{  
                  "id":973,
                  "customerVO":{  
                     "id":23
                  },
                  "name":"IE 11 pay 2",
                  "sequence":37,
                  "type":"CREDIT_CARD",
                  "status":"ACTIVE",
                  "reference":"6F914ACAFFB3B76F54BB7564208FF28AD538B891",
                  "attributes":{  
                     "nameOnCard":"IE 11 pay 2",
                     "Expiry Date":"3/18"
                  },
                  "accountNumber":"************0004",
                  "whenLogged":1473951536000
               }],
			notAllowedPaymentSources: [{  
                  "id":972,
                  "customerVO":{  
                     "id":23
                  },
                  "name":"IE 11 pay",
                  "sequence":36,
                  "type":"CREDIT_CARD",
                  "status":"ACTIVE",
                  "reference":"6F914ACAFFB3B76F54BB7564208FF28AD538B891",
                  "attributes":{  
                     "nameOnCard":"pablos IE",
                     "Expiry Date":"2/20"
                  },
                  "accountNumber":"************0004",
                  "whenLogged":1473950278000
               }],
			paymentTypeRules: {  
               "grace_days":7,
               "minimum_accept_payment_percent":100.0,
               "rule_number":2,
               "maximum_plan_duration_weeks":0,
               "minimum_payment_interval_days":0,
               "minimum_accept_commit_percent":0.0,
               "default_frequency":"M",
               "direct_debit_start_interval_days":10,
               "account_status":null,
               "subscription_balance_minimum_percent":0.0,
               "maximum_acceptable_payment_amount":0.0,
               "product":null,
               "balance":null,
               "maximum_number_of_payments":0,
               "minimum_accept_overlimit_percent":0.0,
               "minimum_number_of_payments":2,
               "maximum_acceptable_disposable_income_percent":0.0,
               "acceptable_payment_channels":"CREDIT_CARD, DEBIT_CARD, DIRECT_DEBIT",
               "maximum_payment_interval_days":31,
               "minimum_accept_commit_amount":1.0,
               "rule_name":"rule.name.plan"
            },
			authorizationMethodRules: [{
					paymentType: 'PLAN',
					allowedAuthorizationMethod:'SMS', 
					paymentSources:['CREDIT_CARD','DEBIT_CARD']
				}, 
				{
					paymentType: 'FDP',
					allowedAuthorizationMethod:'AUTO', 
					paymentSources:['CREDIT_CARD','DEBIT_CARD']
				}
			]
		}

		paymentPlan = new PaymentRule(obj)

	})
   describe('should have a ', ()=> {
      it('paymentType', () => {
         expect(paymentPlan.paymentType).toEqual('PLAN')
      })
      it('allowedPaymentSources', () => {
         expect(paymentPlan.allowedPaymentSources).toEqual(obj.allowedPaymentSources)
      })
      it('notAllowedPaymentSources', () => {
         expect(paymentPlan.notAllowedPaymentSources).toEqual(obj.notAllowedPaymentSources)
      })
      it('paymentTypeRules', () => {
         expect(paymentPlan.ruleFigures).toEqual(obj.paymentTypeRules)
      })
      it('authorizationMethodRules', () => {
         expect(paymentPlan.authMethods).toEqual([{allowedAuthorizationMethod:'SMS', 
                  paymentSources:['CREDIT_CARD','DEBIT_CARD']}])
      })
   })

   describe('will calculate the minimum balance accepted', () => {

      beforeEach(() => {
         paymentPlan.updatePaymentRules({arrearsAmount: 1000 })
      })
      it('defaulting to the arrearsAmount', () => {
         expect(paymentPlan.balance).toEqual(1000)
      })
      it('defaulting to 1 when no subscription_balance_minimum_percent', () => {
         expect(paymentPlan.minBalance).toEqual(0)
      })
      it('when subscription_balance_minimum_percent', () => {
         paymentPlan.updatePaymentRules({subscription_balance_minimum_percent: 10})
         expect(paymentPlan.minBalance).toEqual(100)
      })
   })

   describe('will validate the balance returning', () => {

      beforeEach( () => {
             paymentPlan.updatePaymentRules({ arrearsAmount: 1000, subscription_balance_minimum_percent: 20})
         })

      it('maxAmount error when balance over arrearsAmount', () => {
         expect(paymentPlan.validateBalance(1050)).toEqual('balance.amount.more.maxAmount')
      })
      it('minAmount error when balance less than subscription balance minimum percent', () => {
         expect(paymentPlan.validateBalance(150)).toEqual('balance.amount.less.minBalance')
      })
      describe('when balance is valid', () => {

         it('it will return true', ()=> {
            expect(paymentPlan.validateBalance(250)).toEqual(true)
         })
         it('it will modify to the new balance ', ()=> {
            paymentPlan.validateBalance(250)
            expect(paymentPlan.balance).toEqual(250)
         })
      })
     
   })

   describe('will accept ', ()=> {

      it('an auth method', ()=> {
         paymentPlan.updatePaymentRules({ auth: "SMS" })
         expect(paymentPlan.payment.attributes["auth-type"]).toEqual('SMS')
      })
      it('a customer account', ()=> {
         paymentPlan.updatePaymentRules({ accountVO: 5 })
         expect(paymentPlan.payment.customerAccountVO.id).toEqual(5)
      })
   })

   describe('will calculate the slider minimum amount', () => {

      it('that will default to 1 if no restrictions provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56})
         expect(paymentPlan.minSlider).toEqual(1)
      })

      it('that will default to balance if balance < 1', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 0.8 , minimum_accept_commit_amount: false })
         expect(paymentPlan.minSlider).toEqual(0.8)
      })

      it('when minimum accept commit amount is provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, minimum_accept_commit_amount: 300})
         expect(paymentPlan.minSlider).toEqual(300)
      })
      it('when minimum accept commit percent is provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, minimum_accept_commit_percent: 5, minimum_accept_commit_amount: 1})
         expect(paymentPlan.minSlider).toEqual(61.72)
      })

      it('defaulting to balance when maximum number of payments is 1', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount:  1234.56, maximum_number_of_payments: 1})
         expect(paymentPlan.minSlider).toEqual(1234.56)
      })
     
   })

   describe('will calculate the slider maximum amount', () => {
      it('when minimum number of payments is provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, minimum_number_of_payments: 4 })
         expect(paymentPlan.maxSlider).toEqual(1231.56)
      })

      it('when maximum accept payment amount is provided', ()=> {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_acceptable_payment_amount: 50})
         expect(paymentPlan.maxSlider).toEqual(50)
      })

      it('when maximum acceptable disposable income percent is provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_acceptable_disposable_income_percent: 30, disposableIncome: 200})
         expect(paymentPlan.maxSlider).toEqual(60)
      })

   })

   describe('will calculate the number of payments', () => {
      it('when slider amount is provided', () => {
         paymentPlan.updatePaymentRules({ arrearsAmount: 1000,  minimum_number_of_payments: 1, sliderAmount: 1})
         expect(paymentPlan.numPayments).toEqual(1000)
      })
      describe('when the maximum plan duration weeks is provided', () => {

         it('and default default frequency is monthly', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1000,  minimum_number_of_payments: 2, sliderAmount: 1, maximum_plan_duration_weeks: 780 })
            expect(paymentPlan.numPayments).toEqual(182)
         })

         it('and default default frequency is fortnightly', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1000,  minimum_number_of_payments: 2, sliderAmount: 1, maximum_plan_duration_weeks: 780, selectedFrequency: 'B'})
            expect(paymentPlan.numPayments).toEqual(390)
         })

         it('and default default frequency is weekly', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1000,  minimum_number_of_payments: 2, sliderAmount: 1, maximum_plan_duration_weeks: 780, selectedFrequency: 'W'})
            expect(paymentPlan.numPayments).toEqual(780)
         })

      })
   })

   describe('will calculate the last payment amount', () => {

      describe('with monthly frequency and ', () => {
         it('when maximum plan duration weeks is provided, row_7', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1000, maximum_plan_duration_weeks: 6, minimum_number_of_payments: 1, sliderAmount: 1 })
            expect(paymentPlan.lastPaymentAmount).toEqual(999)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(999)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1000)
            expect(paymentPlan.numPayments).toEqual(2)
         })

         it('when minimum number of payments is provided, row_8', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(1053.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(1053.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1233.56)
            expect(paymentPlan.numPayments).toEqual(182)
         })

         it('when minimum accept commit amount is provided, row_18', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, minimum_accept_commit_amount: 5, sliderAmount: 5 })
            expect(paymentPlan.lastPaymentAmount).toEqual(329.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(329.56)
            expect(paymentPlan.minSlider).toEqual(5)
            expect(paymentPlan.maxSlider).toEqual(1229.56)
            expect(paymentPlan.numPayments).toEqual(182)
         })

         it('when maximum accept payment amount is provided, row_38', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, maximum_acceptable_payment_amount: 50, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(1.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(1.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(50)
            expect(paymentPlan.numPayments).toEqual(1234)
         })

         it('when minimum number of payments is provided, row_42', () => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_number_of_payments: 15, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, minimum_accept_commit_percent: 5, sliderAmount: 61.72 })
            expect(paymentPlan.lastPaymentAmount).toEqual(370.48)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(370.48)
            expect(paymentPlan.minSlider).toEqual(61.72)
            expect(paymentPlan.maxSlider).toEqual(1172.84)
            expect(paymentPlan.numPayments).toEqual(15)
         })
      })

      describe('with weekly frequency and ', () => {
         it('when maximum plan duration weeks is provided, row_51', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'W', arrearsAmount: 1000, maximum_plan_duration_weeks: 6, minimum_number_of_payments: 1, sliderAmount: 1 })
            expect(paymentPlan.lastPaymentAmount).toEqual(995)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(995)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1000)
            expect(paymentPlan.numPayments).toEqual(6)
         })
         it('when minimum number of payments is provided, row_55', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'W', arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(455.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(455.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1233.56)
            expect(paymentPlan.numPayments).toEqual(780)
         })
         it('when minimum accept commit amount is provided, row_65', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'W', arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, minimum_accept_commit_amount: 5, sliderAmount: 5 })
            expect(paymentPlan.lastPaymentAmount).toEqual(9.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(9.56)
            expect(paymentPlan.minSlider).toEqual(5)
            expect(paymentPlan.maxSlider).toEqual(1229.56)
            expect(paymentPlan.numPayments).toEqual(246)
         })
         it('when maximum accept payment amount is provided, row_82', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'W', arrearsAmount: 1234.56, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, maximum_acceptable_payment_amount: 50, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(1.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(1.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(50)
            expect(paymentPlan.numPayments).toEqual(1234)
         })
         it('when minimum number of payments is provided, row_86', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'W', arrearsAmount: 1234.56, maximum_number_of_payments: 15, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, minimum_accept_commit_percent: 5, sliderAmount: 61.72 })
            expect(paymentPlan.lastPaymentAmount).toEqual(370.48)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(370.48)
            expect(paymentPlan.minSlider).toEqual(61.72)
            expect(paymentPlan.maxSlider).toEqual(1172.84)
            expect(paymentPlan.numPayments).toEqual(15)
         })
      })

      describe('with fortnightly frequency and ', () => {
         it('when maximum plan duration weeks is provided, row_96', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1000, maximum_plan_duration_weeks: 6, minimum_number_of_payments: 1, sliderAmount: 1 })
            expect(paymentPlan.lastPaymentAmount).toEqual(998)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(998)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1000)
            expect(paymentPlan.numPayments).toEqual(3)
         })
         it('when minimum number of payments is provided, row_100', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(845.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(845.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(1233.56)
            expect(paymentPlan.numPayments).toEqual(390)
         })
         it('when minimum accept commit amount is provided, row_110', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1234.56, maximum_plan_duration_weeks: 780, minimum_number_of_payments: 2, minimum_accept_commit_amount: 5, sliderAmount: 5 })
            expect(paymentPlan.lastPaymentAmount).toEqual(9.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(9.56)
            expect(paymentPlan.minSlider).toEqual(5)
            expect(paymentPlan.maxSlider).toEqual(1229.56)
            expect(paymentPlan.numPayments).toEqual(246)
         })
         it('when maximum accept payment amount is provided, row_126', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1234.56, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, maximum_acceptable_payment_amount: 50, sliderAmount: 1})
            expect(paymentPlan.lastPaymentAmount).toEqual(1.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(1.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(50)
            expect(paymentPlan.numPayments).toEqual(1234)
         })
         it('when minimum number of payments is provided, row_130', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1234.56, maximum_number_of_payments: 15, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, minimum_accept_commit_percent: 5, sliderAmount: 61.72 })
            expect(paymentPlan.lastPaymentAmount).toEqual(370.48)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(370.48)
            expect(paymentPlan.minSlider).toEqual(61.72)
            expect(paymentPlan.maxSlider).toEqual(1172.84)
            expect(paymentPlan.numPayments).toEqual(15)
         })
         it('when minimum number of payments is provided, row_132', () => {
            paymentPlan.updatePaymentRules({ selectedFrequency: 'B', arrearsAmount: 1234.56, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, maximum_acceptable_disposable_income_percent: 30, disposableIncome: 200, sliderAmount: 1 })
            expect(paymentPlan.lastPaymentAmount).toEqual(1.56)
            expect(_.last(paymentPlan.payment.paymentScheduleVOList)['amount']).toEqual(1.56)
            expect(paymentPlan.minSlider).toEqual(1)
            expect(paymentPlan.maxSlider).toEqual(60)
            expect(paymentPlan.numPayments).toEqual(1234)
         })
      })

      describe('will calculate the date of the schedules', () => {

         beforeEach(() => {
            paymentPlan.updatePaymentRules({ arrearsAmount: 1234.56, maximum_number_of_payments: 15, minimum_number_of_payments: 2, minimum_accept_commit_amount: 1, minimum_accept_commit_percent: 5, sliderAmount: 61.72 })
         })

         describe('for weekly frequency', () => {

            beforeEach(() => {
               paymentPlan.updatePaymentRules({ selectedFrequency: 'W' })
            })

            it('difference of 7 days between each schedule', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-04-24') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-04-24')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-05-01')
            }) 
            it('if it is a leap year, the 29th of February will be chosen', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-02-22')})
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-02-22')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-02-29')
            }) 
            it('if it is not a leap year, the 1st of March will be chosen', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-02-22')})
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-02-22')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-03-01')
            }) 
         })

         describe('for biweekly frequency', () => {

            beforeEach(() => {
               paymentPlan.updatePaymentRules({ selectedFrequency: 'B' })
            })

            it('difference of 14 days between each schedule', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-04-17') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-04-17')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-05-01')
            })  
            it('if it is a leap year, the 29th of February will be chosen', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-04-17') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-04-17')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-05-01')
            })   
            it('if it is not a leap year, the 28th of February will be chosen', () => { 
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-02-15') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-02-15')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-03-01')
            })   
         })

         describe('for monthly frequency', () => {

            beforeEach(() => {
               paymentPlan.updatePaymentRules({ selectedFrequency: 'M' })
            })

            it('all schedule dates should be in the same day of different months', () => {   
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-11-30') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-11-30')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-12-30')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-01-30')
            }) 
            it('all schedule dates should be in the same day of different months II', () => {  
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-07-10') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-07-10')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-08-10')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2015-09-10')
            })

            it('all schedule dates should be in the same day of different months III', () => {   
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-11-01') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-11-01')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-12-01')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-01-01')
            }) 

            it('all schedule dates should be in the same day of different months IV', () => {   
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-11-02') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-11-02')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-12-02')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-01-02')
            }) 

            it('if the date is not available, the next valid date will be chosen', () => {  
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-10-31') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-10-31')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-12-01')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2015-12-31')
            })

            it('if the date is not available, the next valid date will be chosen II', () => {  
               paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2014-03-31') })
               expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2014-03-31')
               expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2014-05-01')
               expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2014-05-31')
               expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2014-07-01')
               expect(paymentPlan.payment.paymentScheduleVOList[4].dueDate).toEqual('2014-07-31')
               expect(paymentPlan.payment.paymentScheduleVOList[5].dueDate).toEqual('2014-08-31')
               expect(paymentPlan.payment.paymentScheduleVOList[6].dueDate).toEqual('2014-10-01')
               expect(paymentPlan.payment.paymentScheduleVOList[7].dueDate).toEqual('2014-10-31')
               expect(paymentPlan.payment.paymentScheduleVOList[8].dueDate).toEqual('2014-12-01')
               expect(paymentPlan.payment.paymentScheduleVOList[9].dueDate).toEqual('2014-12-31')
               expect(paymentPlan.payment.paymentScheduleVOList[10].dueDate).toEqual('2015-01-31')
            }) 

            describe('it can cope with february dates', ()  => {

               describe('in no leap years', () => {

                  it('on the 29th of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-01-29') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-01-29')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2015-03-29')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2015-04-29')
                  })

                  it('on the 30th of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-01-30') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-01-30')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2015-03-30')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2015-04-30')
                  })

                  it('on the 31st of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2015-01-31') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2015-01-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2015-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2015-03-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2015-05-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[4].dueDate).toEqual('2015-05-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[5].dueDate).toEqual('2015-07-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[6].dueDate).toEqual('2015-07-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[7].dueDate).toEqual('2015-08-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[8].dueDate).toEqual('2015-10-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[9].dueDate).toEqual('2015-10-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[10].dueDate).toEqual('2015-12-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[11].dueDate).toEqual('2015-12-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[12].dueDate).toEqual('2016-01-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[13].dueDate).toEqual('2016-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[14].dueDate).toEqual('2016-03-31')
                  })
               })

               describe('in leap years', () => {

                  it('on the 29th of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-01-29') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-01-29')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-02-29')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-03-29')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2016-04-29')
                  })

                  it('on the 30th of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-01-30') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-01-30')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-03-30')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2016-04-30')
                  })

                  it('on the 31st of January', () => {
                     paymentPlan.updatePaymentRules({ firstPaymentDate: moment('2016-01-31') })
                     expect(paymentPlan.payment.paymentScheduleVOList[0].dueDate).toEqual('2016-01-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[1].dueDate).toEqual('2016-03-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[2].dueDate).toEqual('2016-03-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[3].dueDate).toEqual('2016-05-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[4].dueDate).toEqual('2016-05-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[5].dueDate).toEqual('2016-07-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[6].dueDate).toEqual('2016-07-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[7].dueDate).toEqual('2016-08-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[8].dueDate).toEqual('2016-10-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[9].dueDate).toEqual('2016-10-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[10].dueDate).toEqual('2016-12-01')
                     expect(paymentPlan.payment.paymentScheduleVOList[11].dueDate).toEqual('2016-12-31')
                     expect(paymentPlan.payment.paymentScheduleVOList[12].dueDate).toEqual('2017-01-31')
                  })

               })

            })

            
         })

      })

   })


})