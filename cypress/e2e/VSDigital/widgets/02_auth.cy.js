import SignUp from "../../../pages/VSDigital/widgets/signup";
import Login from "../../../pages/VSDigital/widgets/login";
import HomePage from "../../../pages/VSDigital/widgets/homePage";

const login = new Login();
const signUp = new SignUp();
const homePage = new HomePage();

describe("Auth Test Cases", () => {
  let cred;

  before(() => {
    cy.fixture("VSDigital/widgets/signUpDetails").then((data) => {
      cred = data;
    });
  });

  it("should be able to verify SignUp successful", () => {
    cy.intercept("POST", "/api/v1/Widget/AddUser").as("addUser");

    homePage.visit();
    cy.wait(1000);
    signUp.visit();
    cy.wait(2000);
    signUp.signUp(cred);
    cy.wait(5000);

    cy.wait("@addUser").then((interception) => {
      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Assert the response body data
      const responseBody = interception.response.body;
      cy.log(responseBody);
      expect(responseBody).to.have.property("status", "Success");
    });
  });

  it("should be able to verify duplicate email address", () => {
    cy.intercept("POST", "/api/v1/Widget/AddUser").as("addUser");

    homePage.visit();
    cy.wait(1000);
    signUp.visit();
    cy.wait(2000);
    signUp.signUp(cred);
    cy.wait(5000);

    cy.wait("@addUser").then((interception) => {
      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Assert the response body data
      const responseBody = interception.response.body;
      cy.log(responseBody);
      expect(responseBody).to.have.property("status", "Warning");
      expect(responseBody).to.have.property(
        "message",
        "A user with this email already exists"
      );
    });
  });

  it("should be able to verify invalid login creds", () => {
    cy.intercept(
      "POST",
      "https://vsdigitaltest.b2clogin.com/vsdigitaltest.onmicrosoft.com/B2C_1_SignUp_SignIn_Widget/SelfAsserted?tx=StateProperties=eyJUSUQiOiJiMmQyNTY0Mi0wYWMyLTQ5MjEtYmI5Ni1lMDg4ODI0Njc3ZjkifQ&p=B2C_1_SignUp_SignIn_Widget"
    ).as("getUser");

    homePage.visit();
    cy.wait(1000);
    login.visit();
    cy.wait(1000);
    login.login({ email: "te1234@gmail.com", password: "test123" });

    cy.origin(Cypress.env("BACKOFFICE_LOGIN_LINK"), {}, () => {
      cy.get(".error.pageLevel")
        .find("p")
        .should("have.text", "We can't seem to find your account");
    });
  });

  it("should be able to verify Login successful", () => {
    cy.intercept(
      "GET",
      "/api/v1/UserManagement/UserTypeListForTypeWiseLogin/true"
    ).as("getUserTypeList");

    homePage.visit();
    cy.wait(1000);
    login.visit();
    cy.wait(1000);
    login.login(cred);

    cy.wait("@getUserTypeList").then((interception) => {
      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Assert the response body data
      const responseBody = interception.response.body;
      cy.log(responseBody);
      expect(responseBody).to.have.property("status", "Success");

      // Add more assertions based on your specific response data
      expect(responseBody).to.have.property("data");
      expect(responseBody.data[0]).to.include({
        email: cred.email,
        firstName: cred.firstName,
        lastName: cred.lastName,
      });
    });
  });

  it("should be able to verify login and logout flow successful", () => {
    homePage.visit();
    cy.wait(1000);
    login.visit();
    login.login(cred);
    cy.wait(5000);
    login.logout();
    login.elements.logInVisitBtn().should("exist");
    signUp.elements.signUpVisitBtn().should("exist");
  });
});
