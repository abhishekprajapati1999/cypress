class ServiceProviderPage {
  elements = {
    selectField: (field, value) =>
      cy.get(".form-group").contains("label", field).parent().find("select"),
    multiSelectField: (field, value) =>
      cy
        .contains("label", field) // Find the label 'State License Valid In'
        .parent() // Move to the parent div
        .find(".dropdown-heading") // Find the dropdown container
        .click() // Click to open the dropdown
        .get("ul.options") // Find the list of options
        .contains("li", value) // Find the 'Alabama' option in the list
        .find('input[type="checkbox"]'), // Find the checkbox input inside the 'Alabama' label
    radioField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inputField: (field, value) =>
      cy.get(".form-group").contains("label", field).parent().find("input"),
    saveBtn: () => cy.contains("button[type='button']", "Save"),
    drivingLicenseUpload: () =>
      cy.get("input[id='serviceProvider.drivingLicenseImageOriginalFileName']"),
    submitBtn: () => cy.get("button[class='btn btn-success']"),
    licenseUpload: () => cy.get("input[id='serviceProvider.licenseUpload']"),
    state: (value) =>
      cy.contains("option", "Select State").parent().select(value),
    widgetLink: () => cy.get('a[href*="vsdigital-bookingwidget-test"]'),
  };

  visit() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/medicalassistant/sp/new`);
    return;
  }

  editVisit(id) {
    return cy.visit(
      `${Cypress.env("BACKOFFICE_LINK")}/medicalassistant/sp/edit/${id}`
    );
  }

  addServiceProvider(info) {
    cy.wait(5000);
    this.elements.inputField("First Name").clear().type(info.firstName);
    this.elements.inputField("Middle Name").clear().type(info.middleName);
    this.elements.inputField("Last Name").clear().type(info.lastName);
    this.elements.inputField("Email").clear().type(info.email);
    this.elements.inputField("Phone").clear().type(info.phone);
    this.elements.selectField("Default Business").select(info.business);
    cy.wait(2000);
    this.elements.selectField("Gender").select(info.gender);
    this.elements.inputField("Date Of Birth").clear().type(info.DOB);
    this.elements.radioField("Test Account?", info.testAccount).check();
    this.elements
      .radioField(
        "Allow SP To Claim Other Bookings",
        info.allowSPToClaimOtherBookings
      )
      .check();
    this.elements.inputField("Biography").clear().type(info.biography);
    this.elements.inputField("Tax ID No").clear().type(info.taxIDNo);
    this.elements
      .drivingLicenseUpload()
      .attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(100);
    this.elements.selectField("Default Time Zone").select(info.defaultTimeZone);
    this.elements
      .selectField("Commission/Profit Share?")
      .select(info.commissionOrProfitShare);
    this.elements.inputField("License Type").clear().type(info.licenseType);
    this.elements.inputField("License Number").clear().type(info.licenseNumber);
    this.elements.inputField("License Expiry").clear().type(info.licenseExpiry);
    this.elements.licenseUpload().attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(100);
    this.elements
      .multiSelectField("State License Valid In", info.stateLicenseValidIn)
      .check();
    this.elements.inputField("Address Line 1").clear().type(info.addressLine1);
    this.elements.inputField("Address Line 2").clear().type(info.addressLine2);
    this.elements.selectField("Country").select(info.country);
    cy.wait(2000);
    this.elements.state(info.state);
    this.elements.inputField("City").clear().type(info.city);
    this.elements.inputField("ZipCode").clear().type(info.zip);
    this.elements.saveBtn().click();
  }

  validateServiceProvider(info) {
    cy.wait(5000);
    this.elements.inputField("First Name").should("have.value", info.firstName);
    this.elements
      .inputField("Middle Name")
      .should("have.value", info.middleName);
    this.elements.inputField("Last Name").should("have.value", info.lastName);
    this.elements.inputField("Email").should("have.value", info.email);
    this.elements.inputField("Phone").should("have.value", info.phone);
    this.elements
      .selectField("Default Business")
      .find("option:selected")
      .should("contain.text", info.business);
    cy.wait(2000);
    this.elements
      .selectField("Gender")
      .find("option:selected")
      .should("contain.text", info.gender);
    this.elements.inputField("Date Of Birth").should("have.value", info.DOB);
    this.elements
      .radioField("Test Account?", info.testAccount)
      .should("be.checked");
    this.elements
      .radioField(
        "Allow SP To Claim Other Bookings",
        info.allowSPToClaimOtherBookings
      )
      .should("be.checked");
    this.elements.inputField("Biography").should("have.value", info.biography);
    this.elements.inputField("Tax ID No").should("have.value", info.taxIDNo);
    this.elements
      .selectField("Default Time Zone")
      .find("option:selected")
      .should("contain.text", info.defaultTimeZone);
    this.elements
      .selectField("Commission/Profit Share?")
      .should("have.value", info.commissionOrProfitShare);
    this.elements
      .inputField("License Type")
      .should("have.value", info.licenseType);
    this.elements
      .inputField("License Number")
      .should("have.value", info.licenseNumber);
    this.elements
      .inputField("License Expiry")
      .should("have.value", info.licenseExpiry);
    this.elements
      .multiSelectField("State License Valid In", info.stateLicenseValidIn)
      .should("be.checked");
    this.elements
      .inputField("Address Line 1")
      .should("have.value", info.addressLine1);
    this.elements
      .inputField("Address Line 2")
      .should("have.value", info.addressLine2);
    this.elements
      .selectField("Country")
      .find("option:selected")
      .should("contain.text", info.country);
    cy.wait(2000);
    this.elements.inputField("City").should("have.value", info.city);
    this.elements.inputField("ZipCode").should("have.value", info.zip);
  }
}

export default ServiceProviderPage;
