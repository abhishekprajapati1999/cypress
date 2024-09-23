import * as locators from "../../../locators/VSDigital/backOffice/user.json";
class UserPage {
  elements = {
    ...locators,
    saveLink: () => cy.get(this.elements.saveLinkLocator),
    selectField: (field) =>
      cy
        .get(this.elements.selectFieldLocator)
        .contains("label", field)
        .parent()
        .find("select"),
    radioField: (field, value) =>
      cy
        .get(this.elements.radioFieldLocator)
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inputField: (field) =>
      cy
        .get(this.elements.inputFieldLocator)
        .contains("label", field)
        .parent()
        .find("input"),
  };

  visitAdd() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/users/new`);
  }

  visitEdit(id) {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/users/edit/${id}`);
  }

  addUser(userInfo) {
    cy.wait(5000);
    this.elements.inputField("First Name").clear().type(userInfo.firstName);
    this.elements.inputField("Last Name").clear().type(userInfo.lastName);
    this.elements.inputField("Email").clear().type(userInfo.email);
    this.elements.inputField("Phone").clear().type(userInfo.phone);
    this.elements.selectField("Role").select(userInfo.role);
    if (userInfo.role === "Admin" || userInfo.role === "MD") {
      this.elements.selectField("Business").select(userInfo.business);
    } else if (userInfo.role.includes(["Client", "Docter Network Admin"])) {
      this.elements.radioField("Test Account?", userInfo.testAccount).check();
    }
    this.elements.inputField("Address1").clear().type(userInfo.addressLine1);
    this.elements.inputField("Address2").clear().type(userInfo.addressLine2);
    this.elements.selectField("Country").select(userInfo.country);
    cy.wait(2000);
    this.elements.selectField("State").select(userInfo.state);
    this.elements.inputField("City").clear().type(userInfo.city);
    this.elements.inputField("Zip Code").clear().type(userInfo.zip);
    this.elements.saveLink().click();
  }

  validateUser(userInfo) {
    cy.wait(5000);
    this.elements
      .inputField("First Name")
      .should("have.value", userInfo.firstName);
    this.elements
      .inputField("Last Name")
      .should("have.value", userInfo.lastName);
    this.elements.inputField("Email").should("have.value", userInfo.email);
    this.elements.inputField("Phone").should("have.value", userInfo.phone);
    this.elements
      .selectField("Role")
      .find("option:selected")
      .should("contain.text", userInfo.role);
    if (userInfo.role === "Admin" || userInfo.role === "MD") {
      this.elements
        .selectField("Business")
        .find("option:selected")
        .should("contain.text", userInfo.business);
    } else if (userInfo.role.includes(["Client", "Docter Network Admin"])) {
      this.elements.radioField("Test Account?", userInfo.testAccount).check();
    }
    this.elements
      .inputField("Address1")
      .should("have.value", userInfo.addressLine1);
    this.elements
      .inputField("Address2")
      .should("have.value", userInfo.addressLine2);
    this.elements
      .selectField("Country")
      .find("option:selected")
      .should("contain.text", userInfo.country);
    this.elements
      .selectField("State")
      .find("option:selected")
      .should("contain.text", userInfo.state);
    this.elements.inputField("City").should("have.value", userInfo.city);
    this.elements.inputField("Zip Code").should("have.value", userInfo.zip);
  }
}

export default UserPage;
