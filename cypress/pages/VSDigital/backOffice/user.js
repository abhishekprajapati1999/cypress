class UserPage {
  elements = {
    addUserLink:
      "https://vsdigital-backoffice-test.azurewebsites.net/users/new",
    saveLink: () => cy.get(".btn-primary"),
    selectField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .find("select")
        .select(value),
    radioField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input")
        .check(),
    inputField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .find("input")
        .clear()
        .type(value),
  };

  visitAdd() {
    cy.visit(this.elements.addUserLink);
  }

  visitEdit(id) {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/users/edit/${id}`)
  }

  addUser(userInfo) {
    this.elements.inputField("First Name", userInfo.firstName);
    this.elements.inputField("Last Name", userInfo.lastName);
    this.elements.inputField("Email", userInfo.email);
    this.elements.inputField("Phone", userInfo.phone);
    this.elements.selectField("Role", userInfo.role);
    if (userInfo.role === "Admin" || userInfo.role === "MD") {
      this.elements.selectField("Business", userInfo.business);
    } else if (userInfo.role.includes(["Client", "Docter Network Admin"])) {
      this.elements.radioField("Test Account?", userInfo.testAccount);
    }
    this.elements.inputField("Address1", userInfo.addressLine1);
    this.elements.inputField("Address2", userInfo.addressLine2);
    this.elements.selectField("Country", userInfo.country);
    cy.wait(2000);
    this.elements.selectField("State", userInfo.state);
    this.elements.inputField("City", userInfo.city);
    this.elements.inputField("Zip Code", userInfo.zip);
    this.elements.saveLink().click();
  }
}

export default UserPage;
