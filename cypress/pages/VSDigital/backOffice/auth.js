import HomePage from "./homePage";
const home = new HomePage();
import * as locators from "../../../locators/VSDigital/backOffice/auth.json";

class Auth {
  elements = {
    ...locators,
    selectAccount: () => cy.get(this.elements.selectAccountLocator),
    confirmAccount: () => cy.get(this.elements.confirmAccountLocator),
    usernameTxt: () => cy.get(this.elements.usernameTxtLocator),
    userNameBtn: () => cy.get(this.elements.userNameBtnLocator),
    logoutBtn: () => cy.get(this.elements.logoutBtnLocator),
  };

  login(creds) {
    const { emailTxtLocator, passwordTxtLocator, selectAccount, loginBtnLocator } = this.elements;
    const { email, password, account } = creds;

    cy.session(
      { emailTxtLocator, passwordTxtLocator, selectAccount, loginBtnLocator, email, password },
      () => {
        home.visit();
        cy.wait(4000);
        cy.origin(
          Cypress.env("BACKOFFICE_LOGIN_LINK"),
          { args: { emailTxtLocator, passwordTxtLocator, loginBtnLocator, email, password } },
          ({ emailTxtLocator, passwordTxtLocator, loginBtnLocator, email, password }) => {
            cy.get(emailTxtLocator).clear().type(email);
            cy.get(passwordTxtLocator).clear().type(password);
            cy.get(loginBtnLocator).click();
          }
        );
        cy.wait(7000);
        this.elements
          .selectAccount()
          .contains("label", account)
          .parent()
          .find("input")
          .check();
        this.elements.confirmAccount().click();
      },
      {
        cacheAcrossSpecs: true,
      }
    );
    home.visit();
  }

  logout() {
    this.elements.userNameBtn().click();
    this.elements.logoutBtn().click();
    return;
  }
}

export default Auth;
