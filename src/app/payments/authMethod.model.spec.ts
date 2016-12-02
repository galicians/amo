import {AuthMethodRule} from './authMethod.model';

describe('AuthMethodRule Model', () => {

	let authMethod;
	let obj;

	beforeEach(function() {
		obj = {  
			    allowedAuthorizationMethod:"SMS",
			    paymentSources:[  
			       "DEBIT_CARD",
			       "CREDIT_CARD"
			    ]
			};
		authMethod = new AuthMethodRule(obj)
	});

	it('should have an allowedAuthorizationMethod assigned', () => {
		expect(authMethod.allowedAuthorizationMethod).toEqual('SMS');
	});

	it('should have paymentSources assigned', () => {
		expect(authMethod.paymentSources).toEqual(["DEBIT_CARD","CREDIT_CARD"])
	});

});