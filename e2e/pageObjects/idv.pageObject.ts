export class IdvPageObject {
	public loginBtn = element(by.id('login-btn'));
	public inputs = element.all(by.css('.login-input'));

	answer(answers: Array<string>) {
		console.log('typeof inputs', typeof this.inputs)
		this.inputs.map((input, index) => {
			input.sendKeys(answers[index])
		})
	}

}