import * as locators from "../../../locators/VSDigital/widgets/homepage.json";
class HomePage {
  elements = {
    ...locators,
    optionTabs: () => cy.get(this.elements.optionTabsLocator),
  };

  visit() {
    cy.fixture("VSDigital/backOffice/businessDetails.json").then((data) => {
      cy.visit(data.widgetLink);
    });
  }

  service(type) {
    return this.elements.optionTabs().contains(type).click();
  }
}

export default HomePage;
