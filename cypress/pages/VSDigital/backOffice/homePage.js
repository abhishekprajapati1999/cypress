class HomePage {
  elements = {
    homePageLink: "https://vsdigital-backoffice-test.azurewebsites.net/",
  };

  visit() {
    cy.visit(this.elements.homePageLink);
  }
}

export default HomePage;
