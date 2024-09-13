import HomePage from "../../pages/VSDigital/homePage";

const homePage = new HomePage();

describe("Home", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to verify the services are available", () => {
    cy.intercept("POST", "/api/v1/Widget/GetWidgetBookingChoiceList").as(
      "bookingChoiceList"
    );
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
