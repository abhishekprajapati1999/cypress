import Auth from "../../pages/auth";
import HomePage from "../../pages/homePage";

const auth = new Auth();
const homePage = new HomePage();

describe("Amazon Login Test Cases", () => {
  let loginCreds;

  before(() => {
    cy.fixture("loginCreds").then((data) => {
      loginCreds = data;
    });
  });

  it("Verify Login successful", () => {
    homePage.visit();
    auth.visit();
    const username = loginCreds.success.username || Cypress.env('USERNAME');
    const password = loginCreds.success.password || Cypress.env('PASSWORD');
    auth.signIn(username, password);
    auth.elements
      .successTxt()
      .should("contain", loginCreds.success.expected);
  });

  it("Verify Login unsuccessful for wrong username", () => {
    homePage.visit();
    auth.visit();
    auth.setUsername(loginCreds.error.username);
    auth.elements
      .errorTxt()
      .should("contain", loginCreds.error.expected);
  });

  it("Verify Logout successful", () => {
    homePage.visit();
    auth.visit();
    const username = loginCreds.success.username || Cypress.env('USERNAME');
    const password = loginCreds.success.password || Cypress.env('PASSWORD');
    auth.signIn(username, password);
    auth.signOut();
    cy.url().should("contain", homePage.elements.homePageLink);
  });
});
