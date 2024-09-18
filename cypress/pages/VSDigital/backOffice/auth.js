import HomePage from "./homePage";
const home = new HomePage();

class Auth {
  elements = {
    emailTxt: "#email",
    passwordTxt: "#password",
    loginBtn: "#next",
    errorTxt: ".error.pageLevel",
    selectAccount: () => cy.get(".form-check"),
    confirmAccount: () => cy.get("button[class='btn btn-primary']"),
    usernameTxt: () =>
      cy.get(
        ".text-dark-50.font-weight-bolder.font-size-base.d-none.d-md-inline.mr-3.cm-header-content-name-wrapper"
      ),
    userNameBtn: () =>
      cy.get(
        ".btn.btn-icon.w-auto.btn-clean.d-flex.align-items-center.btn-lg.px-2"
      ),
    logoutBtn: () => cy.get("button[type='button']"),
  };

  login(creds) {
    const { emailTxt, passwordTxt, selectAccount, loginBtn } = this.elements;
    const { email, password, account } = creds;

    cy.session(
      { emailTxt, passwordTxt, selectAccount, loginBtn, email, password },
      () => {
        home.visit();
        cy.wait(4000);
        cy.origin(
          Cypress.env("BACKOFFICE_LOGIN_LINK"),
          { args: { emailTxt, passwordTxt, loginBtn, email, password } },
          ({ emailTxt, passwordTxt, loginBtn, email, password }) => {
            cy.get(emailTxt).clear().type(email);
            cy.get(passwordTxt).clear().type(password);
            cy.get(loginBtn).click();
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
