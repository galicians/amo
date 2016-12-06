import {IdvPageObject} from './pageObjects/idv.pageObject';

describe('IDV', () => {

  let idv = new IdvPageObject();
  let answers;

  beforeEach(() => {
    browser.get('/app/idv')
    answers = ['11111', '18-09-1982', 'se10xp']
  })

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Angular 2 App');
  });

  it('should have a btn display sign in', () => {
     expect(idv.loginBtn.getText()).toBe('Sign in')
  });

  // it('should move to the welcome page after sign in with correct login details', () => {
  //   idv.answer(answers)
  //   idv.loginBtn.click()
  //   expect(browser.getCurrentUrl()).toMatch('welcome')
  // })

});