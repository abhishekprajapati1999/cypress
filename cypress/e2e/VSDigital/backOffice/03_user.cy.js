import { faker } from "@faker-js/faker";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import UserPage from "../../../pages/VSDigital/backOffice/user";
import generateUserDetails from "../../../utils/factories/backOffice/user";

const auth = new Auth();
const homePage = new HomePage();
const userPage = new UserPage();

describe("User Test Cases", () => {
  let user;
  let cred;
  let businessName;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      businessName = data.businessName;
    });
  });

  it("should be able to create an admin user", () => {
    cy.intercept("POST", "/api/v1/UserManagement/AddUser").as("adduser");
    user = generateUserDetails({ role: "Admin", businessName: businessName });
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    userPage.visitAdd();
    cy.wait(5000)
    userPage.addUser(user);

    cy.wait("@adduser").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile("cypress/fixtures/VSDigital/backOffice/userDetails.json", {
        ...user,
        userId: responseBody.data.userId,
        userDetailId: responseBody.data.userDetailId,
      });
    });
  });

  it("should be able to edit an admin user", () => {
    cy.intercept("POST", "/api/v1/UserManagement/UpdateUser").as("updateUser");
    user = generateUserDetails({ role: "Admin", businessName: businessName });
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);
    cy.fixture("VSDigital/backOffice/userDetails.json").then((data) => {
      userPage.visitEdit(data.userDetailId);
      user = data;
    });
    cy.wait(5000)
    const newPhone = faker.string.numeric(10);
    userPage.elements.inputField("Phone", newPhone);
    userPage.elements.saveLink().click();

    cy.wait("@updateUser").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile("cypress/fixtures/VSDigital/backOffice/userDetails.json", {
        ...user,
        phone: newPhone,
      });
    });
  });
});
