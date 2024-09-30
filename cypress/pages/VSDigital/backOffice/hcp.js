import * as locators from "../../../locators/VSDigital/backOffice/hcp.json";

class HCPPage {
  elements = {
    ...locators,
    selectField: (field) =>
      cy
        .get(this.elements.selectFieldLocator)
        .contains("label", field)
        .parent()
        .find("select"),
    multiSelectField: (field, value) =>
      cy
        .contains(this.elements.multiSelectFieldLocator, field)
        .parent()
        .find(".dropdown-heading")
        .click()
        .wait(1000)
        .get("ul.options")
        .contains("li", value)
        .find('input[type="checkbox"]'),
    radioField: (field, value) =>
      cy
        .get(this.elements.radioFieldLocator)
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inlineRadioField: (field, value) =>
      cy
        .get(this.elements.inlineRadioFieldLocator)
        .contains("label", field)
        .parent()
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
    saveBtn: () => cy.get(this.elements.editBtnLocator),
    drivingLicenseUpload: () =>
      cy.get(this.elements.drivingLicenseUploadLocator),
    submitBtn: () => cy.get(this.elements.submitBtnLocator),
    licenseUpload: () => cy.get(this.elements.licenseUploadLocator),
    state: (value) =>
      cy
        .contains(this.elements.stateLocator, "Select State")
        .parent()
        .select(value),
    widgetLink: () => cy.get(this.elements.widgetLinkLocator),
    prefix: () => cy.get(this.elements.prefixLocator),
  };

  visit() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/medicalassistant/hcp/new`);
    return;
  }

  editVisit(id) {
    return cy.visit(
      `${Cypress.env("BACKOFFICE_LINK")}/medicalassistant/hcp/edit/${id}`
    );
  }

  addHCP(info) {
    cy.wait(5000);
    this.elements
      .radioField("VSDigital Doctor Network", info.vSDigitalDoctorNetwork)
      .check();
    this.elements.prefix().select(info.prefix);
    this.elements.inputField("First Name").clear().type(info.firstName);
    this.elements.inputField("Middle Name").clear().type(info.middleName);
    this.elements.inputField("Last Name").clear().type(info.lastName);
    this.elements.inputField("Suffix").clear().type(info.prefix);
    this.elements.inputField("Email").clear().type(info.email);
    this.elements.inputField("Phone").clear().type(info.phone);
    this.elements.selectField("Default Business").select(info.business);
    cy.wait(2000);
    this.elements.selectField("Gender").select(info.gender);
    this.elements.inputField("Date Of Birth").clear().type(info.DOB);
    this.elements.radioField("Test Account?", info.testAccount).check();
    this.elements.inputField("Biography").clear().type(info.biography);
    this.elements.inputField("Tax ID No").clear().type(info.taxIDNo);
    this.elements
      .drivingLicenseUpload()
      .attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(100);
    this.elements.selectField("Default Time Zone").select(info.defaultTimeZone);
    this.elements
      .inlineRadioField("Can do Medical Consult?", info.canDoMedicalConsult)
      .check();
    this.elements
      .inlineRadioField(
        "Can do Medical Screenings?",
        info.candoMedicalScreenings
      )
      .check();
    this.elements.inputField("Level 1").clear().type(info.level1);
    this.elements.inputField("Level 2").clear().type(info.level2);
    this.elements.inputField("Level 3").clear().type(info.level3);
    this.elements.inputField("Level 4").clear().type(info.level4);
    this.elements.inputField("NPI Number").clear().type(info.NPINumber);
    this.elements.inputField("DEA Number").clear().type(info.DEANumber);
    this.elements.selectField("Verification").select(info.verification);
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

  validateHCP(info) {
    cy.wait(5000);
    this.elements
      .radioField("VSDigital Doctor Network", info.vSDigitalDoctorNetwork)
      .should("be.checked");
    this.elements
      .prefix()
      .find("option:selected")
      .should("contain.text", info.prefix);
    this.elements.inputField("First Name").should("have.value", info.firstName);
    this.elements
      .inputField("Middle Name")
      .should("have.value", info.middleName);
    this.elements.inputField("Last Name").should("have.value", info.lastName);
    this.elements.inputField("Suffix").should("have.value", info.prefix);
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
    this.elements.inputField("Biography").should("have.value", info.biography);
    this.elements.inputField("Tax ID No").should("have.value", info.taxIDNo);
    this.elements
      .inlineRadioField("Can do Medical Consult?", info.canDoMedicalConsult)
      .should("be.checked");
    this.elements
      .inlineRadioField(
        "Can do Medical Screenings?",
        info.candoMedicalScreenings
      )
      .should("be.checked");
    this.elements.inputField("Level 1").should("have.value", info.level1);
    this.elements.inputField("Level 2").should("have.value", info.level2);
    this.elements.inputField("Level 3").should("have.value", info.level3);
    this.elements.inputField("Level 4").should("have.value", info.level4);
    this.elements.inputField("NPI Number").should("have.value", info.NPINumber);
    this.elements.inputField("DEA Number").should("have.value", info.DEANumber);
    this.elements
      .selectField("Verification")
      .find("option:selected")
      .should("contain.text", info.verification);
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
      .inputField("Address Line 1")
      .should("have.value", info.addressLine1);
    this.elements
      .inputField("Address Line 2")
      .should("have.value", info.addressLine2);
    this.elements.inputField("City").should("have.value", info.city);
    this.elements.inputField("ZipCode").should("have.value", info.zip);
  }
}

export default HCPPage;
