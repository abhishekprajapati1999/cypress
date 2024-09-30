import * as locators from "../../../locators/VSDigital/backOffice/service.json";

class ServicePage {
  elements = {
    ...locators,
    selectField: (field, position = 0) =>
      cy.contains("label", field).eq(position).parent().find("select"),
    inlineRadioField: (field, value) =>
      cy

        .contains("label", field)
        .parent()
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inlineInputField: (field, value) =>
      cy.contains("label", field).parent().parent().find("input"),
    customInputField: (field, value) =>
      cy.contains("label", field).parent().find("input"),

    inlineSelectField: (field, value) =>
      cy.contains("label", field).parent().parent().find("select"),

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

        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inputField: (field) => cy.contains("label", field).parent().find("input"),
    editorField: (field) =>
      cy
        .contains("label", field)
        .parent()
        .find(this.elements.editorFieldLocator),
    saveBtn: () => cy.get(this.elements.saveBtnLocator),
    editSaveBtn: () => cy.get(this.elements.editSaveBtnLocator),
    selectServiceCategory: () =>
      cy.get(this.elements.selectServiceCategoryLocator),
    checkAll: () => cy.get(this.elements.checkAllLocator),
    continueBtn: () =>
      cy.contains(this.elements.continueBtnLocator, "Continue"),
    setSP: (field, value) =>
      cy
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    setPSI: () => cy.get(this.elements.editorFieldLocator).last(),
  };

  visit() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/service/new`);
    return;
  }

  editVisit(id) {
    return cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/service/edit/${id}`);
  }

  addService(info) {
    cy.wait(7000);
    this.elements.selectField("Type").select(info.type);
    this.elements.inputField("Name").clear().type(info.serviceName);
    this.elements
      .inputField("Internal Name")
      .clear()
      .type(info.serviceInternalName);
    this.elements.selectField("Status").select(info.status);
    this.elements
      .inputField("Service Duration")
      .clear()
      .type(info.serviceDuration);
    this.elements
      .inputField("Additional time per person")
      .clear()
      .type(info.additionalTimePerPersion);
    this.elements
      .inputField("Travel Buffer Time")
      .clear()
      .type(info.travelBufferTime);
    // Service Category
    this.elements.selectServiceCategory().click();
    cy.wait(2000);
    this.elements.checkAll().click();
    this.elements.continueBtn().click();
    cy.wait(2000);
    this.elements.selectField("Business").select(info.business);
    cy.wait(2000);
    this.elements.radioField("Booking Type", "Callout").check();
    this.elements.radioField("Booking Type", "Facility").check();
    this.elements.inputField("TagLine").clear().type(info.tagline);
    this.elements
      .inputField("Listing TagLine")
      .clear()
      .type(info.listingTagline);
    this.elements
      .inputField("Service Ingredients")
      .clear()
      .type(info.serviceIngredients);
    this.elements
      .editorField("Service Listing Description")
      .clear()
      .type(info.serviceListingDescription);
    this.elements.editorField("Benefits").clear().type(info.benefits);
    this.elements
      .inlineRadioField(
        "Does this service requires a HCP consultation",
        info.doesthisServiceRequiresHCPConsultation
      )
      .check();
    this.elements
      .inlineInputField("How long is the consultation valid for?")
      .clear()
      .type(info.howLongIsTheConsultationValidForValue);
    this.elements
      .inlineSelectField("How long is the consultation valid for?")
      .select(info.howLongIsTheConsultationValidForUnit);
    this.elements
      .inlineSelectField("Consultation Commission Level")
      .select(info.consultationCommissionLevel);
    this.elements
      .customInputField("Consultation margin ($)")
      .clear()
      .type(info.consultationMargin);
    this.elements
      .setSP(
        "Set service as patient specific",
        info.setServiceAsPatientSpecific
      )
      .check();

    this.elements.radioField("Shipping Address", info.shippingAddress).check();
    this.elements
      .radioField("Type of HCP consultation", info.typeOfHCPConsultant)
      .check();
    cy.wait(2000);
    cy.get("#preAssessmentRequired").first().check().check();
    cy.wait(5000);
    this.elements.inputField("Frequency").clear().type(info.frequencyValue);
    this.elements.selectField("Frequency").select(info.frequencyUnit);
    cy.wait(2000);
    this.elements.selectField("Pre Assessments").select(info.preAssessment);
    this.elements
      .radioField("Is Re assessment required?", info.isReAssessmentRequired)
      .check();
    cy.wait(2000);
    this.elements.radioField("Labs Required", info.labsRequired).check();
    cy.wait(2000);
    // this.elements.selectField("Lab Source").select(info.labSource);
    // this.elements
    //   .inputField("Test Code")
    //   .clear()
    //   .type(info.testCode);
    this.elements
      .radioField("Medication Required", info.medicationRequired)
      .check();
    this.elements
      .radioField(
        "Is the medication self administered?",
        info.ismedicationSelfAdministered
      )
      .check();
    this.elements
      .radioField("Medication Auto Renew", info.medicationAutoRenew)
      .check();
    this.elements
      .radioField("Are check-ins required?", info.checkInRequired)
      .check();
    this.elements.inputField("Price of Vial").clear().type(info.priceOfVial);
    this.elements.inputField("Shipping Cost").clear().type(info.shippingCost);
    this.elements
      .inputField("Program Duration")
      .clear()
      .type(info.programDurationValue);
    this.elements
      .selectField("Program Duration")
      .select(info.programDurationUnit);
    this.elements.inputField("Dosage").clear().type(info.dosageValue);
    this.elements.selectField("Dosage").select(info.dosageUnit);
    this.elements.inputField("Size").clear().type(info.medicationSizeValue);
    this.elements.selectField("Size").select(info.medicationSizeUnit);
    this.elements
      .inputField("Strength")
      .clear()
      .type(info.medicationStrengthValue);
    this.elements.selectField("Strength").select(info.medicationStrengthUnit);
    this.elements
      .inputField("Medication Expiry")
      .eq(0)
      .clear()
      .type(info.medicationExpiryValue);
    this.elements
      .inputField("Medication Expiry")
      .eq(1)
      .clear()
      .type(info.medicationExpiryUnit);
    this.elements
      .setPSI()
      .clear({ force: true })
      .type(info.patientSpecificInformationPage, { force: true });
    this.elements
      .inputField("VSDigital package cost to business ($)")
      .clear()
      .type(info.VSDigitalPackageCostToBusiness);
    this.elements
      .inputField("Selling Price ($)")
      .clear()
      .type(info.sellingPrice);
    this.elements
      .inputField("Default Commission")
      .clear()
      .type(info.defaultCommission);
    this.elements
      .inputField("Commission Level - Silver")
      .clear()
      .type(info.commissionLevelSilver);
    this.elements
      .inputField("Commission Level - Gold")
      .clear()
      .type(info.commissionLevelGold);
    this.elements.saveBtn().click();
  }

  validateService(info) {
    cy.wait(5000);
    this.elements
      .selectField("Type")
      .find("option:selected")
      .should("contain.text", info.type);
    this.elements.inputField("Name").should("have.value", info.serviceName);
    this.elements
      .inputField("Internal Name")
      .should("have.value", info.serviceInternalName);
    this.elements
      .selectField("Status")
      .find("option:selected")
      .should("contain.text", info.status);
    this.elements
      .inputField("Service Duration")
      .should("have.value", info.serviceDuration);
    this.elements
      .inputField("Additional time per person")
      .should("have.value", info.additionalTimePerPersion);
    this.elements
      .inputField("Travel Buffer Time")
      .should("have.value", info.travelBufferTime);
    this.elements
      .selectField("Business")
      .find("option:selected")
      .should("contain.text", info.business);
    this.elements.radioField("Booking Type", "Callout").should("be.checked");
    this.elements.radioField("Booking Type", "Facility").should("be.checked");
    this.elements.inputField("TagLine").should("have.value", info.tagline);
    this.elements
      .inputField("Listing TagLine")
      .should("have.value", info.listingTagline);
    this.elements
      .inputField("Service Ingredients")
      .should("have.value", info.serviceIngredients);
    this.elements
      .editorField("Service Listing Description")
      .invoke("text")
      .should("contain", info.serviceListingDescription);
    this.elements
      .editorField("Benefits")
      .invoke("text")
      .should("contain", info.benefits);
    this.elements
      .inlineRadioField(
        "Does this service requires a HCP consultation",
        info.doesthisServiceRequiresHCPConsultation
      )
      .should("be.checked");
    this.elements
      .inlineInputField("How long is the consultation valid for?")
      .should("have.value", info.howLongIsTheConsultationValidForValue);
    this.elements
      .inlineSelectField("How long is the consultation valid for?")
      .find("option:selected")
      .should("contain.text", info.howLongIsTheConsultationValidForUnit);
    this.elements
      .customInputField("Consultation margin ($)")
      .should("have.value", info.consultationMargin);
    this.elements
      .setSP(
        "Set service as patient specific",
        info.setServiceAsPatientSpecific
      )
      .should("be.checked");

    this.elements
      .radioField("Shipping Address", info.shippingAddress)
      .should("be.checked");
    this.elements
      .radioField("Type of HCP consultation", info.typeOfHCPConsultant)
      .should("be.checked");
    cy.wait(2000);
    this.elements
      .radioField("Pre Assessment Required", info.preAssessmentRequired)
      .check({ force: true });
    cy.wait(5000);
    this.elements
      .inputField("Frequency")
      .should("have.value", info.frequencyValue);
    this.elements
      .selectField("Frequency")
      .find("option:selected")
      .should("contain.text", info.frequencyUnit);
    cy.wait(2000);
    this.elements
      .selectField("Pre Assessments")
      .find("option:selected")
      .should("contain.text", info.preAssessment);
    this.elements
      .radioField("Is Re assessment required?", info.isReAssessmentRequired)
      .should("be.checked");
    this.elements
      .radioField("Labs Required", info.labsRequired)
      .should("be.checked");
    // this.elements
    //   .selectField("Lab Source")
    //   .find("option:selected")
    //   .should("contain.text", info.labSource);
    // this.elements
    //   .inputField("Test Code")
    //   .should("have.value", info.testCode);
    this.elements
      .radioField("Medication Required", info.medicationRequired)
      .should("be.checked");
    this.elements
      .radioField(
        "Is the medication self administered?",
        info.ismedicationSelfAdministered
      )
      .should("be.checked");
    this.elements
      .radioField("Medication Auto Renew", info.medicationAutoRenew)
      .should("be.checked");
    this.elements
      .radioField("Are check-ins required?", info.checkInRequired)
      .should("be.checked");
    this.elements
      .inputField("Price of Vial")
      .should("have.value", info.priceOfVial);
    this.elements
      .inputField("Shipping Cost")
      .should("have.value", info.shippingCost);
    this.elements
      .inputField("Program Duration")
      .should("have.value", info.programDurationValue);
    this.elements
      .selectField("Program Duration")
      .find("option:selected")
      .should("contain.text", info.programDurationUnit);
    this.elements.inputField("Dosage").should("have.value", info.dosageValue);
    this.elements
      .selectField("Dosage")
      .find("option:selected")
      .should("contain.text", info.dosageUnit);
    this.elements
      .inputField("Size")
      .should("have.value", info.medicationSizeValue);
    this.elements
      .selectField("Size")
      .find("option:selected")
      .should("contain.text", info.medicationSizeUnit);
    this.elements
      .inputField("Strength")
      .should("have.value", info.medicationStrengthValue);
    this.elements
      .selectField("Strength")
      .find("option:selected")
      .should("contain.text", info.medicationStrengthUnit);
    this.elements
      .inputField("Medication Expiry")
      .eq(0)
      .should("have.value", info.medicationExpiryValue);
    this.elements
      .inputField("Medication Expiry")
      .eq(1)
      .should("have.value", info.medicationExpiryUnit);
    this.elements
      .setPSI()
      .invoke("text")
      .should("contain", info.patientSpecificInformationPage);
    this.elements
      .inputField("VSDigital package cost to business ($)")
      .should("have.value", info.VSDigitalPackageCostToBusiness);
    this.elements
      .inputField("Selling Price ($)")
      .should("have.value", info.sellingPrice);
    this.elements
      .inputField("Default Commission")
      .should("have.value", info.defaultCommission);
    this.elements
      .inputField("Commission Level - Silver")
      .should("have.value", info.commissionLevelSilver);
    this.elements
      .inputField("Commission Level - Gold")
      .should("have.value", info.commissionLevelGold);
  }
}

export default ServicePage;
