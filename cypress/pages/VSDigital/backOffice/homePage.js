class HomePage {
  elements = {
    homePageLink: Cypress.env("BACKOFFICE_LINK"),
  };

  visit() {
    cy.visit(this.elements.homePageLink);
  }
}

export default HomePage;
