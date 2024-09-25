import { faker } from "@faker-js/faker";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import ServicePage from "../../../pages/VSDigital/backOffice/service";
import generateServiceDetails from "../../../utils/factories/backOffice/service";

const auth = new Auth();
const homePage = new HomePage();
const service = new ServicePage();

describe("Service Test Cases", () => {
  let cred;
  let serviceDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((businessData) => {
      cy.fixture("VSDigital/backOffice/preAssessmentDetails").then(
        (preAssessmentData) => {
          serviceDetails = generateServiceDetails({
            businessName: businessData.businessName,
            preAssessment: preAssessmentData.name,
          });
          cy.log(serviceDetails)
        }
      );
    });
  });

  it("should be able to create a service provider successfully", () => {
    cy.intercept("POST", "/api/v1/Service/AddService").as("addService");
    cy.intercept("POST", "/api/v1/Service/GetServices").as("getService");
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to add service provider page
    service.visit();
    cy.wait(7000);
    service.addService(serviceDetails);
    cy.wait(2000);

    cy.wait("@addService").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/serviceDetails.json",
        serviceDetails
      );
    });

    cy.wait("@getService").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.log(responseBody);
      expect(responseBody.data).to.have.property("entities");
      cy.log(responseBody.data.entities[0].name);
      cy.log(serviceDetails.name);
      expect(responseBody.data.entities[0].name).contains(
        serviceDetails.serviceName
      );
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/serviceDetails.json",
        {
          serviceId: responseBody.data.entities[0].serviceId,
          ...serviceDetails,
        }
      );
    });
  });

  it("should be able to edit service duration in a service", () => {
    cy.fixture("VSDigital/backOffice/serviceDetails.json").then((data) => {
      cy.intercept("POST", "/api/v1/Service/UpdateService").as("updateService");
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      service.editVisit(data.serviceId);
      cy.wait(7000);
      const newData = {
        serviceDuration: faker.number.int({ min: 10, max: 60 }),
      };
      service.elements
        .inputField("Service Duration")
        .clear()
        .type(newData.serviceDuration);
      cy.wait(2000);

      service.elements.editSaveBtn().click();
      cy.wait(5000);

      cy.wait("@updateService").then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        const responseBody = interception.response.body;
        expect(responseBody).to.have.property("status", "Success");
        expect(responseBody).to.have.property("data");
        cy.writeFile(
          "cypress/fixtures/VSDigital/backOffice/serviceDetails.json",
          {
            ...data,
            ...newData,
          }
        );
      });
    });
  });

  it("should be able to validate the service info", () => {
    cy.fixture("VSDigital/backOffice/serviceDetails").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      service.editVisit(data.serviceId);
      cy.wait(7000);
      service.validateService(data);
    });
  });
});
