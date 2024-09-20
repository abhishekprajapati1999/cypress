import Auth from "../../../pages/VSDigital/backOffice/auth";
import BusinessPage from "../../../pages/VSDigital/backOffice/business";
import HomePage from "../../../pages/VSDigital/backOffice/homePage";
import generateBusinessDetails from "../../../utils/factories/backOffice/businesss";

const auth = new Auth();
const homePage = new HomePage();
const businessPage = new BusinessPage();

describe("Business Test Cases", () => {
  let cred;
  let businessDetails;

  before(() => {
    cy.fixture("VSDigital/backOffice/loginCreds").then((data) => {
      cred = data;
    });
    businessDetails = generateBusinessDetails();
  });

  it("should be able to create a business", () => {
    cy.intercept("POST", "/api/v1/Business/AddBusiness").as("addBusiness");
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    // Navigate to Business page
    businessPage.visit();
    cy.wait(7000);
    businessPage.addBusiness(businessDetails);
    cy.wait(2000);

    cy.wait("@addBusiness").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      cy.writeFile(
        "cypress/fixtures/VSDigital/backOffice/businessDetails.json",
        {
          businessId: responseBody.data.businessId,
          ...businessDetails,
        }
      );
    });
  });

  it("should be able to find the widget link for the business", () => {
    cy.fixture("VSDigital/backOffice/businessDetails.json").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);
      // Get Widget Link
      businessPage.editVisit(data.businessId);
      cy.wait(2000);
      businessPage.elements
        .widgetLink()
        .invoke("attr", "href")
        .then((href) => {
          // Save info
          cy.writeFile(
            "cypress/fixtures/VSDigital/backOffice/businessDetails.json",
            {
              ...data,
              widgetLink: href,
            }
          );
        });
    });
  });

  it("should be able to edit a business with mobile booking commission", () => {
    cy.intercept(
      "POST",
      "api/v1/Business/SaveBookingTypeWiseBusinessCommission"
    ).as("saveBookingTypeWiseBusinessCommission");
    homePage.visit();
    auth.login(cred);
    auth.elements.usernameTxt().contains(cred.expected);

    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      businessPage.editVisit(data.businessId);
    });
    cy.wait(5000)
    businessPage.addMobileBookingCommision(businessDetails);

    cy.wait("@saveBookingTypeWiseBusinessCommission").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
    });
  });

  it("should be able to validate the business info", () => {
    cy.fixture("VSDigital/backOffice/businessDetails.json").then((data) => {
      homePage.visit();
      auth.login(cred);
      auth.elements.usernameTxt().contains(cred.expected);
  
      // Navigate to Business page
      businessPage.editVisit(data.businessId);
      cy.wait(7000);
      businessPage.validateBusinessInfo(data);
    })
  });
});


