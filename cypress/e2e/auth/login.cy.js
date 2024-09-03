import Login from "../../pages/login";

describe.skip("Login Test Cases", () => {
  let loginCreds;
  let loginObj;

  before(() => {
    cy.fixture("loginCreds").then((data) => {
      loginCreds = data;
    });
    loginObj = new Login();
  });

  beforeEach(() => {
    cy.visit("https://uat.app.otolane.com/");
  });

  it("Verify Login successful", () => {
    cy.login(loginCreds.success.username, loginCreds.success.password);
    loginObj.elements
      .successTxt()
      .should("contain", loginCreds.success.expected);
  });

  it("Verify Login unsuccessful for wrong username/password", () => {
    cy.login(loginCreds.error.username, loginCreds.error.password);
    loginObj.elements
      .errorTxt()
      .should("contain", loginCreds.error.expected);
  });
});
