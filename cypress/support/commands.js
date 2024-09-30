/// <reference types="cypress" />

import "cypress-file-upload";
import "cypress-iframe";

Cypress.Commands.add("getIframeBody", (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its("0.contentDocument.body") // Access the body of the iframe
    .should("not.be.empty") // Ensure the body is populated
    .then(cy.wrap); // Wrap the body in a Cypress object
});
