import { faker } from "@faker-js/faker";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import PreAssessmentPage from "../../../pages/VSDigital/backOffice/preAssessment";
import generatePreAssessmentDetails from "../../../utils/factories/backOffice/preAssessment";

const auth = new Auth();
const homePage = new HomePage();
const preAssessment = new PreAssessmentPage();

describe("Pre Assessment Test Cases", () => {
  let cred;
  let preAssessmentDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    preAssessmentDetails = generatePreAssessmentDetails({});
    cy.log(preAssessmentDetails)
  });

  it("should be able to create a Pre Assessment successfully", () => {
    cy.intercept("POST", "api/v1/Dashboard/SaveBackOfficePreAssessmentDetails").as("addPreAssessment");
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to add service provider page
    preAssessment.visit();
    cy.wait(7000);
    preAssessment.addPreAssessment(preAssessmentDetails);
    cy.wait(2000);

    cy.wait("@addPreAssessment").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/preAssessmentDetails.json",
        {
            servicePreAssessmentDetailsId: responseBody.data.servicePreAssessmentDetailsId,
            ...preAssessmentDetails,
          }
      );
    });
  });

  it("should be able to edit minimum BMI in a pre assessment", () => {
    cy.fixture("VSDigital/backOffice/preAssessmentDetails.json").then((data) => {
      cy.intercept("POST", "/api/v1/Dashboard/UpdateBackOfficePreAssessmentDetails").as("updatePreAssessment");
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      preAssessment.editVisit(data.servicePreAssessmentDetailsId);
      cy.wait(7000);
      const newData = {
        minimumBMI: faker.number.int({ min: 10, max: 60 }),
      };
      preAssessment.elements
        .inputField("Minimum BMI", "INFO")
        .last()
        .clear()
        .type(newData.minimumBMI);
      cy.wait(2000);

      preAssessment.elements.saveBtn().click({ force: true });
      cy.wait(5000);

      cy.wait("@updatePreAssessment").then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const responseBody = interception.response.body;
        expect(responseBody).to.have.property("status", "Success");
        expect(responseBody).to.have.property("data");
        cy.writeFile(
          "cypress/fixtures/VSDigital/backOffice/preAssessmentDetails.json",
          {
            ...data,
            ...newData,
          }
        );
      });
    });
  });

  it("should be able to validate the pre assessment info", () => {
    cy.fixture("VSDigital/backOffice/preAssessmentDetails").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      preAssessment.editVisit(data.servicePreAssessmentDetailsId);
      cy.wait(7000);
      preAssessment.validatePreAssessment(data);
    });
  });
});
