class HomePage {
  elements = {
    homePageLink: 'https://www.amazon.in',
    searchTab: () => cy.get('#twotabsearchtextbox'),
    searchBtn: () => cy.get('#nav-search-submit-button')
  };

  visit() {
      cy.visit(this.elements.homePageLink);
  }

  searchFor(item) {
      this.elements.searchTab().clear().type(item);
      this.elements.searchBtn().click();
  }
}

export default HomePage;