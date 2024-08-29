import Logout from "../../pages/logout";

describe("Logout Test cases", () => {
  let loginCreds;
  let logoutObj;

  before(() => {
    cy.fixture("loginCreds").then((data) => {
      loginCreds = data;
    });
    logoutObj = new Logout();
  });

  beforeEach(() => {
    cy.visit("https://uat.app.otolane.com/");
  });

  it("Verify Logout successful", () => {
    cy.login(loginCreds.success.username, loginCreds.success.password);
    logoutObj.clickLogout();
    cy.url().should("contain", "https://uat.app.otolane.com/login");
  });

  it("Verify Logout using custom method", () => {
    cy.login(loginCreds.success.username, loginCreds.success.password);
    cy.logout();
    cy.url().should("contain", "https://uat.app.otolane.com/login");
  });

  it("Verify that logout is unsuccessful when the cancel button is clicked", () => {
    cy.login(loginCreds.success.username, loginCreds.success.password);
    logoutObj.elements.logoutBtn().click();
    logoutObj.elements
      .logoutTxt()
      .should("have.text", "Are you sure you want to log out?");

    logoutObj.elements.cancelBtn().click();
    cy.url()
      .should("not.contain", "https://uat.app.otolane.com/login")
      .and("contain", "https://uat.app.otolane.com/trades/all");
  });
});
