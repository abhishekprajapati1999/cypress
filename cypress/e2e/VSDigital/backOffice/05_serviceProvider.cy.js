import { faker } from "@faker-js/faker";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import ServiceProviderPage from "../../../pages/VSDigital/backOffice/serviceProvider";
import generateServiceProviderDetails from "../../../utils/factories/backOffice/serviceProvider";

const auth = new Auth();
const homePage = new HomePage();
const serviceProvider = new ServiceProviderPage();

describe("Service Provider Test Cases", () => {
  let cred;
  let serviceProviderDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      serviceProviderDetails = generateServiceProviderDetails({
        businessName: data.businessName,
      });
    });
  });

  it("should be able to create a service provider successfully", () => {
    cy.intercept("POST", "/api/v1/ServiceProvider/AddServiceProvider").as(
      "addServiceProvider"
    );
    cy.intercept("POST", "/api/v1/ServiceProvider/GetServiceProviderList").as(
      "getServiceProvider"
    );
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to add service provider page
    serviceProvider.visit();
    cy.wait(7000);
    serviceProvider.addServiceProvider(serviceProviderDetails);
    cy.wait(2000);

    cy.wait("@addServiceProvider").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/serviceProviderDetails.json",
        serviceProviderDetails
      );
    });

    cy.wait("@getServiceProvider").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      expect(responseBody.data).to.have.property("entities");
      expect(responseBody.data.entities[0].username).contains(
        serviceProviderDetails.firstName
      );
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/serviceProviderDetails.json",
        {
          serviceProviderId: responseBody.data.entities[0].serviceProviderId,
          ...serviceProviderDetails,
        }
      );
    });
  });

  it("should be able to find the widget link for the service provider", () => {
    cy.fixture("VSDigital/backOffice/serviceProviderDetails.json").then(
      (data) => {
        homePage.visit();
        auth.login(cred);
        auth.elements.usernameTxt().contains(cred.expected);
        // Get Widget Link
        serviceProvider.editVisit(data.serviceProviderId);
        cy.wait(2000);
        serviceProvider.elements
          .widgetLink()
          .invoke("attr", "href")
          .then((href) => {
            // Save info
            cy.writeFile(
              "cypress/fixtures/VSDigital/backOffice/serviceProviderDetails.json",
              {
                ...data,
                widgetLink: href,
              }
            );
          });
      }
    );
  });

  it("should be able to edit phone number in a service provider", () => {
    cy.fixture("VSDigital/backOffice/serviceProviderDetails.json").then(
      (data) => {
        cy.intercept(
          "POST",
          "/api/v1/ServiceProvider/UpdateServiceProvider"
        ).as("updateServiceProvider");
        homePage.visit();
        auth.login(cred);
        auth.elements.usernameTxt().contains(cred.expected);

        // Navigate to Business page
        serviceProvider.editVisit(data.serviceProviderId);
        cy.wait(7000);
        const newData = {
          phone: faker.string.numeric(10),
        };
        serviceProvider.elements
          .inputField("Phone")
          .clear()
          .type(newData.phone);
        cy.wait(2000);

        serviceProvider.elements.editSaveBtn().click({ force: true });
        cy.wait(10000);

        cy.wait("@updateServiceProvider").then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
          const responseBody = interception.response.body;
          expect(responseBody).to.have.property("status", "Success");
          expect(responseBody).to.have.property("data");
          cy.writeFile(
            "cypress/fixtures/VSDigital/backOffice/serviceProviderDetails.json",
            {
              ...data,
              ...newData,
            }
          );
        });
      }
    );
  });

  it("should be able to validate the service provider info", () => {
    cy.fixture("VSDigital/backOffice/serviceProviderDetails").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      serviceProvider.editVisit(data.serviceProviderId);
      cy.wait(7000);
      serviceProvider.validateServiceProvider(data);
    });
  });
});
