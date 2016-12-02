import {PaymentSource} from './payment-source.model';

describe('PaymentSource Model', () => {
	let paymentSource;
	let obj;

	beforeEach(() => {
		obj = {  
            id:275,
            customerVO:{  
               id:23
            },
            name:"directDebit",
            sequence:23,
            type:"DIRECT_DEBIT",
            status:"ACTIVE",
            reference:"4475052787",
            attributes:{  
               nameOnCard:"nikki",
               sortCode:"123457"
            },
            accountNumber:"****5678",
            whenLogged:1465475367000
         };

		paymentSource = new PaymentSource(obj)
	})

	it('should have an id', () => {
		expect(paymentSource.id).toEqual(275);
	});

	it('should have an id for customerVO', () => {
		expect(paymentSource.customerVO.id).toEqual(23)
	})

	it('should have a name', () => {
		expect(paymentSource.name).toEqual('directDebit');
	})

	it('should have a sequence', () => {
		expect(paymentSource.sequence).toEqual(23)
	})

	it('should have a type', () => {
		expect(paymentSource.type).toEqual('DIRECT_DEBIT')
	})

	it('should have a status', () => {
		expect(paymentSource.status).toEqual('ACTIVE')
	})

	it('should have a reference', () => {
		expect(paymentSource.reference).toEqual('4475052787')
	})

	it('should have an attributes object', () => {
		expect(paymentSource.attributes).toEqual({"nameOnCard":"nikki", "sortCode":"123457"})
	})

	it('should have an accountNumber', () => {
		expect(paymentSource.accountNumber).toEqual("****5678")
	})

	it('should have a time whenLogged', () => {
		expect(paymentSource.whenLogged).toEqual(1465475367000)
	})

})




