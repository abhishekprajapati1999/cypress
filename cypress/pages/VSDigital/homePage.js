class HomePage {
  elements = {
    homePageLink: 'https://vsdigital-bookingwidget-test.azurewebsites.net/widget-business/ukjb8',
    optionTabs: () => cy.get('.d-flex.flex-column.justify-content-center.align-items-center.p-10.mb-4.mr-0.mr-sm-4.mr-md-0.mr-lg-4.gap-4.bg-white-800.cm-flex-1.bg-white.cm-border-radius')
  };

  visit() {
      cy.visit(this.elements.homePageLink);
  }

  service(type) {
    return this.elements.optionTabs().contains(type).click();
  }
}

export default HomePage;