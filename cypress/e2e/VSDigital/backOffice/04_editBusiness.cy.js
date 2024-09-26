import { beforeEach } from "mocha";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import BusinessPage from "../../../pages/VSDigital/backOffice/business";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import { faker } from "@faker-js/faker";

const auth = new Auth();
const homePage = new HomePage();
const businessPage = new BusinessPage();

describe("Edit Business Test Cases", () => {
  let cred;
  let businessDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      businessDetails = data;
    });
  });

  it("should be able to edit phone number in a business", () => {
    cy.intercept("POST", "/api/v1/Business/UpdateBusiness").as(
      "updateBusiness"
    );
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to Business page
    businessPage.editVisit(businessDetails.businessId);
    cy.wait(5000);
    const newData = {
      phone: faker.string.numeric(10),
      note: faker.word.words(5),
    };
    businessPage.elements.inputField("Phone").clear().type(newData.phone);
    businessPage.elements.inputField("Note").clear().type(newData.note);
    cy.wait(2000);

    businessPage.elements.saveBtn().click({ force: true });
    cy.wait(10000);

    cy.wait("@updateBusiness").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/businessDetails.json",
        {
          ...businessDetails,
          ...newData,
        }
      );
    });
  });
});
