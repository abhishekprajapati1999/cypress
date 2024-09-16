import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";

const auth = new Auth();
const homePage = new HomePage();

describe("Auth Test Cases", () => {
  let cred;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
  });

  it("should be able to verify invalid login creds", () => {
    cy.intercept(
      "POST",
      "https://vsdigitaltest.b2clogin.com/vsdigitaltest.onmicrosoft.com/B2C_1_SignUp_SignIn_Widget/SelfAsserted"
    ).as("getUser");
    homePage.visit();
    const { emailTxt, passwordTxt, loginBtn, errorTxt } = auth.elements;

    cy.origin(
      "https://vsdigitaltest.b2clogin.com",
      { args: { emailTxt, passwordTxt, loginBtn, errorTxt } },
      ({ emailTxt, passwordTxt, loginBtn, errorTxt }) => {
        cy.get(emailTxt).clear().type("te1234@gmail.com");
        cy.get(passwordTxt).clear().type("test123");
        cy.get(loginBtn).click();
        cy.get(errorTxt)
          .find("p")
          .should("have.text", "We can't seem to find your account");
      }
    );
  });

  it("should be able to verify login successful", () => {
    cy.intercept("POST", "/api/v1/Dashboard/GetBackofficeDashboardDetails").as(
      "verifyLogin"
    );

    auth.login(cred);
    cy.wait(1000);

    cy.wait("@verifyLogin").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      cy.log(responseBody);
      expect(responseBody).to.have.property("status", "Success");
    });

    auth.elements.usernameTxt().contains(cred.expected);
  });

  it("should be able to verify login and logout successful", () => {
    auth.login(cred);
    cy.wait(1000);
    auth.logout();
    cy.wait(5000);
    cy.origin("https://vsdigitaltest.b2clogin.com", {}, () => {
      cy.url().should("include", "b2clogin.com");
    });
  });
});
