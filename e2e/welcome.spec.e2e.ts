import {WelcomePageObject} from './pageObjects/welcome.pageObject'

describe('Welcome', () => {

  var welcome = new WelcomePageObject();
  
  beforeEach(() => {
  	browser.get('/app/welcome')
  })

  // it('should have a test text', () => {
  //   expect(welcome.test.getText()).toBe('this is a test')
  // })


});