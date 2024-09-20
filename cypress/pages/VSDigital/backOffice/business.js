import HomePage from "./homePage";
const home = new HomePage();

class BusinessPage {
  elements = {
    businessMenu: () => cy.contains("span.menu-text", "Business"),
    businessSubMenu: () => cy.get("a[href='/business']"),
    businessActionBtn: () =>
      cy.get("button.btn.btn-primary.btn-sm.ml-1.undefined.cursor-pointer"),
    businessProfileImage: () => cy.get("input[name='businessProfileImage']"),
    businessBannerImage: () => cy.get("input[name='businessBannerImage']"),
    businessListingImage: () => cy.get("input[name='businessListingImage']"),
    bookingTypeCallout: () => cy.get("#calloutBookingType"),
    bookingTypeFacility: () => cy.get("#faciltyBookingType"),
    selectField: (field) =>
      cy.get(".form-group").contains("label", field).parent().find("select"),
    radioField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .contains("label", value)
        .parent()
        .find("input"),
    inputField: (field) =>
      cy.get(".form-group").contains("label", field).parent().find("input"),
    textAreaField: (field) =>
      cy.get(".form-group").contains("label", field).parent().find("textarea"),
    noPaneltyUpTo: () =>
      cy.get("input[placeholder='Enter no penalty up to (hrs)']"),
    bookingChanges: () =>
      cy.get("input[placeholder='Enter % of booking charged']"),
    photoUpdateSubmitBtn: () => cy.get("button[class='btn btn-success']"),
    saveBtn: () => cy.contains("button[type='button']", "Save"),
    cancelBtn: () => cy.contains("button[type='button']", "Cancel"),
    continueBtn: () =>
      cy.get("div[class='modal-footer'] div button[type='button']"),
    // mobile commision
    mobileBookingCommision: () =>
      cy.get("#uncontrolled-tab-example-tab-mobileBookingCommission"),
    businessCommissionType: () =>
      cy.get("select[name='commission.Callout.businessCommissionBasedOn']"),
    businessCommissionPercentage: () =>
      cy.get("input[placeholder='Enter Business Commission']"),
    whitelabelCommissionType: () =>
      cy.get("select[name='commission.Callout.whitelabelCommissionBasedOn']"),
    whitelabelCommissionPercentage: () =>
      cy.get("input[placeholder='Enter Whitelabel Commission']"),
    telemedicineCommissionType: () =>
      cy.get("select[name='commission.Callout.telemedicineCommissionBasedOn']"),
    telemedicineCommissionPercentage: () =>
      cy.get("input[placeholder='Enter Telemedicine Commission']"),
    mobileBookingCommisionSave: () =>
      cy.get(
        "#uncontrolled-tab-example-tabpane-mobileBookingCommission > .col-md-12 > .btn-primary"
      ),
    widgetLink: () => cy.get('a[href*="vsdigital-bookingwidget-test"]'),
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
