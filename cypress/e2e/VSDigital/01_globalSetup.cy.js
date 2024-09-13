// The file 01_globalSetup.cy.js is prefixed with 01 to ensure it runs first, generating JSON data for the tests.

import generateSignUpDetails from "../../utils/factories/signup";

describe("Global Setup for test cases", () => {
  before(() => {
    const signUpDetails = generateSignUpDetails();
    cy.writeFile(
      "cypress/fixtures/VSDigital/signUpDetails.json",
      signUpDetails
    );
  });
});
