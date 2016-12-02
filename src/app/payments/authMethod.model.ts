

export class AuthMethodRule {
	public allowedAuthorizationMethod: string;
	public paymentSources: Array<String>;
	public paymentType?: string;

	constructor(obj: AuthMethodRule) {
		this.allowedAuthorizationMethod = obj.allowedAuthorizationMethod;
		this.paymentSources = obj.paymentSources;
	}
}