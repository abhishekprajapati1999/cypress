class Login {
  elements = {
    usernameInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    loginBtn: () => cy.get('.mat-focus-indicator'), 
    forgotPassword: () => cy.get("a[href='/forgot']"),
    successTxt: () => cy.get(".text-center.my-2"),
    errorTxt: () => cy.get("#mat-error-0")
  };

  //method for entering username
  setUsername(username) {
    this.elements.usernameInput().clear();
    this.elements.usernameInput().type(username);
  }

  //method for entering password
  setPassword(password) {
    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);
  }

  //method for clicking on Login button
  clickLogin() {
    this.elements.loginBtn().click();
  }
}

export default Login;
