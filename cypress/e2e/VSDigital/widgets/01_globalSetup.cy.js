// The file 01_globalSetup.cy.js is prefixed with 01 to ensure it runs first, generating JSON data for the tests.

import generateSignUpDetails from "../../../utils/factories/widgets/signup";

describe("Global Setup for test cases", () => {
  it("should be able to generate sign up details", () => {
    const signUpDetails = generateSignUpDetails();
    cy.log(signUpDetails);
    cy.writeFile(
      "cypress/fixtures/VSDigital/widgets/signUpDetails.json",
      signUpDetails
    );
  });
});
