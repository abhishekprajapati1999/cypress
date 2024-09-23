import HomePage from "./homePage";
import * as locators from "../../../locators/VSDigital/widgets/login.json";

const home = new HomePage();

class Login {
  elements = {
    ...locators,
    logInVisitBtn: () =>
      cy.get(this.elements.logInVisitBtnLocator).contains("Login"),
    logoutBtn: () => cy.get(this.elements.logoutBtnLocator).contains("Logout"),
  };

  visit() {
    home.visit();
    this.elements.logInVisitBtn().click();
    return;
  }

  login(info) {
    const { loginEmailLocator, loginPasswordLocator, loginBtnLocator } =
      this.elements;
    const { email, password } = info;

    cy.origin(
      Cypress.env("BACKOFFICE_LOGIN_LINK"),
      {
        args: {
          loginEmailLocator,
          loginPasswordLocator,
          loginBtnLocator,
          email,
          password,
        },
      },
      ({
        loginEmailLocator,
        loginPasswordLocator,
        loginBtnLocator,
        email,
        password,
      }) => {
        cy.get(loginEmailLocator).type(email);
        cy.get(loginPasswordLocator).type(password);
        cy.get(loginBtnLocator).click();
      }
    );
  }

  logout() {
    return this.elements.logoutBtn().click();
  }
}

export default Login;
