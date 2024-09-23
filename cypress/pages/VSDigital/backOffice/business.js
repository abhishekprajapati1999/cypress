import * as locators from "../../../locators/VSDigital/backOffice/business.json";

class BusinessPage {
  elements = {
    ...locators,
    businessMenu: () =>
      cy.contains(this.elements.businessMenuLocator, "Business"),
    businessSubMenu: () => cy.get(this.elements.businessSubMenuLocator),
    businessActionBtn: () => cy.get(this.elements.businessActionBtnLocator),
    businessProfileImage: () =>
      cy.get(this.elements.businessProfileImageLocator),
    businessBannerImage: () => cy.get(this.elements.businessBannerImageLocator),
    businessListingImage: () =>
      cy.get(this.elements.businessListingImageLocator),
    bookingTypeCallout: () => cy.get(this.elements.bookingTypeCalloutLocator),
    bookingTypeFacility: () => cy.get(this.elements.bookingTypeFacilityLocator),
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
    textAreaField: (field) =>
      cy
        .get(this.elements.textAreaFieldLocator)
        .contains("label", field)
        .parent()
        .find("textarea"),
    noPaneltyUpTo: () => cy.get(this.elements.noPaneltyUpToLocator),
    bookingChanges: () => cy.get(this.elements.bookingChangesLocator),
    photoUpdateSubmitBtn: () =>
      cy.get(this.elements.photoUpdateSubmitBtnLocator),
    saveBtn: () => cy.contains(this.elements.saveBtnLocator, "Save"),
    cancelBtn: () => cy.contains(this.elements.cancelBtnLocator, "Cancel"),
    continueBtn: () => cy.get(this.elements.continueBtnLocator),
    // mobile commision
    mobileBookingCommision: () =>
      cy.get(this.elements.mobileBookingCommisionLocator),
    businessCommissionType: () =>
      cy.get(this.elements.businessCommissionTypeLocator),
    businessCommissionPercentage: () =>
      cy.get(this.elements.businessCommissionPercentageLocator),
    whitelabelCommissionType: () =>
      cy.get(this.elements.whitelabelCommissionTypeLocator),
    whitelabelCommissionPercentage: () =>
      cy.get(this.elements.whitelabelCommissionPercentageLocator),
    telemedicineCommissionType: () =>
      cy.get(this.elements.telemedicineCommissionTypeLocator),
    telemedicineCommissionPercentage: () =>
      cy.get(this.elements.telemedicineCommissionPercentageLocator),
    mobileBookingCommisionSave: () =>
      cy.get(this.elements.mobileBookingCommisionSaveLocator),
    widgetLink: () => cy.get(this.elements.widgetLinkLocator),
  };

  visit() {
    cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/business/new`);
    return;
  }

  editVisit(id) {
    return cy.visit(`${Cypress.env("BACKOFFICE_LINK")}/business/edit/${id}`);
  }

  addBusiness(info) {
    cy.wait(5000);
    this.elements.inputField("Business Name").clear().type(info.businessName);
    this.elements.selectField("Status").select(info.status);
    this.elements.inputField("Phone").clear().type(info.phone);
    this.elements.inputField("Note").clear().type(info.note);
    this.elements.bookingTypeCallout().check();
    this.elements.bookingTypeFacility().check();
    this.elements.radioField("Doctor Network", info.dockerNetwork).check();
    this.elements.radioField("Master Business", info.masterBusiness).check();
    this.elements.radioField(
      "Subscribed to MobileMedIV",
      info.subscribeToMobileMedIV
    );
    this.elements
      .radioField("Can add services on their own", info.addServicesOwn)
      .check();
    this.elements.inputField("Tagline").clear().type(info.profileTagline);
    this.elements
      .textAreaField("Description")
      .clear()
      .type(info.profileDescription);
    this.elements
      .businessProfileImage()
      .attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(1000);
    this.elements.photoUpdateSubmitBtn().click();
    this.elements
      .businessBannerImage()
      .attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(1000);
    this.elements.photoUpdateSubmitBtn().click();
    this.elements
      .businessListingImage()
      .attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(1000);
    this.elements.photoUpdateSubmitBtn().click();
    this.elements.inputField("Address Line 1").clear().type(info.addressLine1);
    this.elements.inputField("Address Line 2").clear().type(info.addressLine2);
    this.elements.selectField("Country").select(info.country);
    cy.wait(2000);
    this.elements.selectField("State").select(info.state);
    this.elements.inputField("City").clear().type(info.city);
    this.elements.inputField("Zip/PostCode").clear().type(info.zip);
    this.elements
      .radioField("Default Business?", info.defaulyBusinesss)
      .check();
    this.elements.radioField("Test Business?", info.testBusiness).check();
    this.elements
      .inputField("Group Discount %")
      .clear()
      .type(info.groupDiscount);
    this.elements
      .inputField("No Of Person For a Group Discount")
      .clear()
      .type(info.noOfPersonGroupDiscount);
    this.elements
      .selectField("Platform Service Fee Type")
      .select(info.platformSeriveFeeType);
    cy.wait(1000);
    this.elements
      .inputField("Enter Platform Service Fee Value")
      .clear()
      .type(info.platformSeriveFeeValue);
    this.elements
      .radioField(
        "Allow business to take cash payments",
        info.allowBussinesToTakeCashPayment
      )
      .check();
    this.elements
      .radioField(
        "Allow business add Membership",
        info.allowBusinessToAddMembership
      )
      .check();
    this.elements
      .radioField(
        "Allow business keep Membership Fees",
        info.allowBusinessKeepMemberShipFees
      )
      .check();
    this.elements
      .radioField("Include Subscription", info.includeSubscription)
      .check();
    this.elements
      .radioField("Pay Subscription to", info.paySubscriptionTo)
      .check();
    this.elements
      .radioField("Allow Service Consultations?", info.allowServiceConsultation)
      .check();
    this.elements
      .radioField(
        "Allow In Session Consultations?",
        info.allowInServiceConsultation
      )
      .check();
    this.elements
      .inputField("Minimum Price ($)")
      .clear()
      .type(info.travelMinPrice);
    this.elements
      .inputField("Price Per Mile ($)")
      .clear()
      .type(info.travelPricePerMile);
    this.elements.noPaneltyUpTo().first().clear().type(info.noPaneltyUpTo1);
    this.elements.bookingChanges().first().clear().type(info.bookingChanges1);
    this.elements.noPaneltyUpTo().last().clear().type(info.noPaneltyUpTo2);
    this.elements.bookingChanges().last().clear().type(info.bookingChanges2);
    this.elements.saveBtn().click();
    cy.wait(7000);
    this.elements.continueBtn().click();
    cy.wait(5000);
    this.elements.cancelBtn().click({ force: true });
  }

  validateBusinessInfo(info) {
    cy.wait(5000);
    this.elements
      .inputField("Business Name")
      .should("have.value", info.businessName);
    this.elements.selectField("Status").should("have.value", info.status);
    this.elements.inputField("Phone").should("have.value", info.phone);
    this.elements.inputField("Note").should("have.value", info.note);
    this.elements.bookingTypeCallout().should("be.checked");
    this.elements.bookingTypeFacility().should("be.checked");
    this.elements
      .radioField("Doctor Network", info.dockerNetwork)
      .should("be.checked");
    this.elements
      .radioField("Master Business", info.masterBusiness)
      .should("be.checked");
    this.elements
      .radioField("Subscribed to MobileMedIV", info.subscribeToMobileMedIV)
      .should("be.checked");
    this.elements
      .radioField("Can add services on their own", info.addServicesOwn)
      .should("be.checked");
    this.elements
      .inputField("Tagline")
      .should("have.value", info.profileTagline);
    this.elements
      .textAreaField("Description")
      .should("have.value", info.profileDescription);
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
    this.elements
      .selectField("State")
      .find("option:selected")
      .should("contain.text", info.state);
    this.elements.inputField("City").should("have.value", info.city);
    this.elements.inputField("Zip/PostCode").should("have.value", info.zip);
    this.elements
      .radioField("Default Business?", info.defaulyBusinesss)
      .should("be.checked");
    this.elements
      .radioField("Test Business?", info.testBusiness)
      .should("be.checked");
    this.elements
      .inputField("Group Discount %")
      .should("have.value", info.groupDiscount);
    this.elements
      .inputField("No Of Person For a Group Discount")
      .should("have.value", info.noOfPersonGroupDiscount);
    this.elements
      .selectField("Platform Service Fee Type")
      .find("option:selected")
      .should("contain.text", info.platformSeriveFeeType);
    this.elements
      .inputField("Enter Platform Service Fee Value")
      .should("have.value", info.platformSeriveFeeValue);
    this.elements
      .radioField(
        "Allow business to take cash payments",
        info.allowBussinesToTakeCashPayment
      )
      .should("be.checked");
    this.elements
      .radioField(
        "Allow business add Membership",
        info.allowBusinessToAddMembership
      )
      .should("be.checked");
    this.elements
      .radioField(
        "Allow business keep Membership Fees",
        info.allowBusinessKeepMemberShipFees
      )
      .should("be.checked");
    this.elements
      .radioField("Include Subscription", info.includeSubscription)
      .should("be.checked");
    this.elements
      .radioField("Pay Subscription to", info.paySubscriptionTo)
      .should("be.checked");
    this.elements
      .radioField("Allow Service Consultations?", info.allowServiceConsultation)
      .should("be.checked");
    this.elements
      .radioField(
        "Allow In Session Consultations?",
        info.allowInServiceConsultation
      )
      .should("be.checked");
    this.elements
      .inputField("Minimum Price ($)")
      .should("have.value", info.travelMinPrice);
    this.elements
      .inputField("Price Per Mile ($)")
      .should("have.value", info.travelPricePerMile);
    this.elements
      .noPaneltyUpTo()
      .first()
      .should("have.value", info.noPaneltyUpTo1);
    this.elements
      .bookingChanges()
      .first()
      .should("have.value", info.bookingChanges1);
    this.elements
      .noPaneltyUpTo()
      .last()
      .should("have.value", info.noPaneltyUpTo2);
    this.elements
      .bookingChanges()
      .last()
      .should("have.value", info.bookingChanges2);
  }

  addMobileBookingCommision(info) {
    this.elements.mobileBookingCommision().click();
    this.elements.businessCommissionType().select(info.businessCommissionType);
    this.elements
      .businessCommissionPercentage()
      .clear()
      .type(info.businessCommissionPercentage);
    this.elements
      .whitelabelCommissionType()
      .select(info.whitelabelCommissionType);
    this.elements
      .whitelabelCommissionPercentage()
      .clear()
      .type(info.whitelabelCommissionPercentage);
    this.elements
      .telemedicineCommissionType()
      .select(info.telemedicineCommissionType);
    this.elements
      .telemedicineCommissionPercentage()
      .clear()
      .type(info.telemedicineCommissionPercentage);
    this.elements.mobileBookingCommisionSave().click({ force: true });
    cy.wait(7000);
  }
}

export default BusinessPage;
