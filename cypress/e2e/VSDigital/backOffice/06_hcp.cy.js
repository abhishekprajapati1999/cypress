import { faker } from "@faker-js/faker";
import Auth from "../../../pages/VSDigital/backOffice/auth";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import HCPPage from "../../../pages/VSDigital/backOffice/hcp";
import generateHCPDetails from "../../../utils/factories/backOffice/hcp";

const auth = new Auth();
const homePage = new HomePage();
const hcp = new HCPPage();

describe("HDP Test Cases", () => {
  let cred;
  let hcpDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      hcpDetails = generateHCPDetails({
        businessName: data.businessName,
      });
      cy.log(hcpDetails)
    });
  });

  it("should be able to create a HCP successfully", () => {
    cy.intercept("POST", "/api/v1/ServiceProvider/AddServiceProvider").as(
      "addHCP"
    );
    cy.intercept("POST", "/api/v1/ServiceProvider/GetServiceProviderList").as(
      "getHCP"
    );
    homePage.visit(); 
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to add service provider page
    hcp.visit();
    cy.wait(7000);
    hcp.addHCP(hcpDetails);
    cy.wait(2000);

    cy.wait("@addHCP").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/hcpDetails.json",
        hcpDetails
      );
    });

    cy.wait("@getHCP").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      expect(responseBody.data).to.have.property("entities");
      expect(responseBody.data.entities[0].username).contains(
        hcpDetails.firstName
      );
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/hcpDetails.json",
        {
          serviceProviderId: responseBody.data.entities[0].serviceProviderId,
          ...hcpDetails,
        }
      );
    });
  });

  it("should be able to edit phone number in a HCP", () => {
    cy.fixture("VSDigital/backOffice/hcpDetails.json").then(
      (data) => {
        cy.intercept(
          "POST",
          "/api/v1/ServiceProvider/UpdateServiceProvider"
        ).as("updateHCP");
        homePage.visit();
        auth.login(cred);
        auth.elements.usernameTxt().contains(cred.expected);

        // Navigate to Business page
        hcp.editVisit(data.serviceProviderId);
        cy.wait(5000);
        const newData = {
          phone: faker.string.numeric(10),
        };
        hcp.elements
          .inputField("Phone")
          .clear()
          .type(newData.phone);
        cy.wait(2000);
        hcp.elements.saveBtn().should("be.visible")
        hcp.elements.saveBtn().click({ force: true });
        cy.wait(10000)

        cy.wait("@updateHCP").then((interception) => {
          expect(interception.response.statusCode).to.eq(200);
          const responseBody = interception.response.body;
          expect(responseBody).to.have.property("status", "Success");
          expect(responseBody).to.have.property("data");
          cy.writeFile(
            "cypress/fixtures/VSDigital/backOffice/hcpDetails.json",
            {
              ...data,
              ...newData,
            }
          );
        });
      }
    );
  });

  it("should be able to validate the HCP info", () => {
    cy.fixture("VSDigital/backOffice/hcpDetails").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);

      // Navigate to Business page
      hcp.editVisit(data.serviceProviderId);
      cy.wait(7000);
      hcp.validateHCP(data);
    });
  });
});
