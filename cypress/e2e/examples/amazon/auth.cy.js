import Auth from "../../../pages/examples/auth";
import HomePage from "../../../pages/examples/homePage";

const auth = new Auth();
const homePage = new HomePage();

describe("Amazon Login Test Cases", () => {
  let loginCreds;

  before(() => {
    cy.fixture("examples/loginCreds").then((data) => {
      loginCreds = data;
    });
  });

  it("Verify Login successful", () => {
    const username = loginCreds.success.username || Cypress.env('USERNAME');
    const password = loginCreds.success.password || Cypress.env('PASSWORD');
    auth.signIn(username, password);
    homePage.visit();
    auth.elements
      .successTxt()
      .should("contain", loginCreds.success.expected);
  });

  

  it("Verify Logout successful", () => {
    const username = loginCreds.success.username || Cypress.env('USERNAME');
    const password = loginCreds.success.password || Cypress.env('PASSWORD');
    auth.signIn(username, password);
    homePage.visit();
    auth.signOut();
    cy.url().should("contain", homePage.elements.homePageLink);
  });
});
