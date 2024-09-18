import HomePage from "./homePage";
const home = new HomePage();

class Login {
  elements = {
    logInVisitBtn: () => cy.get("button.nav-btn.btn-clear").contains("Login"),
    logoutBtn: () => cy.get("button.nav-btn.btn-clear").contains("Logout"),
    loginEmail: "#email",
    loginPassword: "#password",
    loginBtn: "#next",

  };

  visit() {
    home.visit();
    this.elements.logInVisitBtn().click();
    return;
  }

  login(info) {
    const { loginEmail, loginPassword, loginBtn } = this.elements;
    const { email, password } = info;

    cy.origin(
      "https://vsdigitaltest.b2clogin.com",
      { args: { loginEmail, loginPassword, loginBtn, email, password } },
      ({ loginEmail, loginPassword, loginBtn, email, password }) => {
        cy.get(loginEmail).type(email);
        cy.get(loginPassword).type(password);
        cy.get(loginBtn).click();
      }
    );
  }

  logout() {
    return this.elements.logoutBtn().click();
  }
}

export default Login;
