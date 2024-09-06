class Auth {
  elements = {
    signIn: () => cy.get('#nav-link-accountList'),
    usernameInput: () => cy.get("#ap_email"),
    continueBtn: () => cy.get("#continue[type='submit']"),
    passwordInput: () => cy.get("#ap_password"),
    signInBtn: () => cy.get("#signInSubmit"),
    signOutbtn: () => cy.get("a#nav-item-signout"),
    successTxt: () => cy.get("#nav-link-accountList-nav-line-1"),
    errorTxt: () => cy.get("ul[class='a-unordered-list a-nostyle a-vertical a-spacing-none'] span[class='a-list-item']"),
  };

  visit() {
    return this.elements.signIn().click();
  }

  //method for entering username
  setUsername(username) {
    this.elements.usernameInput().clear().type(username);
    this.elements.continueBtn().click();
    return;
  }

  //method for entering password
  setPassword(password) {
    return this.elements.passwordInput().clear().type(password);
  }

  clickSignIn() {
    return this.elements.signInBtn().click();
  }

  //method for clicking on Login button
  signIn(username, password) {
    this.setUsername(username);
    this.setPassword(password);
    this.clickSignIn();
    return;
  }

  signOut() {
    this.elements.signIn().trigger('mouseover');
    this.elements.signOutbtn().click();
    return;
  }
}

export default Auth;
