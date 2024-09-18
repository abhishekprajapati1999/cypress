import HomePage from "../../../pages/VSDigital/widgets/homePage";
import Login from "../../../pages/VSDigital/widgets/login";

const homePage = new HomePage();
const login = new Login();

describe("Home", () => {
  let cred;

  before(() => {
    cy.fixture("VSDigital/widgets/signUpDetails").then((data) => {
      cred = data;
    });
  });

  it("should be able to verify the services are available", () => {
    cy.intercept("POST", "/api/v1/Widget/GetWidgetBookingChoiceList").as(
      "bookingChoiceList"
    );
    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);
    homePage.visit();
    cy.wait(5000);
    cy.wait("@bookingChoiceList").then((interception) => {
      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Assert the response body data
      const responseBody = interception.response.body;
      cy.log(responseBody);
      expect(responseBody).to.have.property("status", "Success");
      expect(responseBody).to.have.property("data");
      expect(responseBody.data.entities.length).to.have.gt(0);
    });
  });
});
