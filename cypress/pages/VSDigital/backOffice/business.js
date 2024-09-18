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

    textAreaField: (field, value) =>
      cy
        .get(".form-group")
        .contains("label", field)
        .parent()
        .find("textarea")
        .clear()
        .type(value),
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
    mobileBookingCommision: () => cy.get("#uncontrolled-tab-example-tab-mobileBookingCommission"),
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
    mobileBookingCommisionSave: () => cy.get('#uncontrolled-tab-example-tabpane-mobileBookingCommission > .col-md-12 > .btn-primary'),
    widgetLink: () => cy.get('a[href*="vsdigital-bookingwidget-test"]'),
  };

  visit() {
    cy.visit(
      `${Cypress.env("BACKOFFICE_LINK")}/business/new`
    );
    return;
  }

  editVisit(id) {
    return cy.visit(
      `${Cypress.env("BACKOFFICE_LINK")}/business/edit/${id}`
    );
  }

  addBusiness(businessDetails) {
    cy.wait(5000);
    this.elements.inputField("Business Name", businessDetails.businessName);
    this.elements.selectField("Status", businessDetails.status);
    this.elements.inputField("Phone", businessDetails.phone);
    this.elements.inputField("Note", businessDetails.note);
    this.elements.bookingTypeCallout().check();
    this.elements.bookingTypeFacility().check();
    this.elements.radioField("Doctor Network", businessDetails.dockerNetwork);
    this.elements.radioField("Master Business", businessDetails.masterBusiness);
    this.elements.radioField(
      "Subscribed to MobileMedIV",
      businessDetails.subscribeToMobileMedIV
    );
    this.elements.radioField(
      "Can add services on their own",
      businessDetails.addServicesOwn
    );
    this.elements.inputField("Tagline", businessDetails.profileTagline);
    this.elements.textAreaField(
      "Description",
      businessDetails.profileDescription
    );
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
    this.elements.inputField("Address Line 1", businessDetails.addressLine1);
    this.elements.inputField("Address Line 2", businessDetails.addressLine2);
    this.elements.selectField("Country", businessDetails.country);
    cy.wait(2000);
    this.elements.selectField("State", businessDetails.state);
    this.elements.inputField("City", businessDetails.city);
    this.elements.inputField("Zip/PostCode", businessDetails.zip);
    this.elements.radioField(
      "Default Business?",
      businessDetails.defaulyBusinesss
    );
    this.elements.radioField("Test Business?", businessDetails.testBusiness);
    this.elements.inputField("Group Discount %", businessDetails.groupDiscount);
    this.elements.inputField(
      "No Of Person For a Group Discount",
      businessDetails.noOfPersonGroupDiscount
    );
    this.elements.selectField(
      "Platform Service Fee Type",
      businessDetails.platformSeriveFeeType
    );
    cy.wait(1000)
    this.elements.inputField(
      "Enter Platform Service Fee Value",
      businessDetails.platformSeriveFeeValue
    );
    this.elements.radioField(
      "Allow business to take cash payments",
      businessDetails.allowBussinesToTakeCashPayment
    );
    this.elements.radioField(
      "Allow business add Membership",
      businessDetails.allowBusinessToAddMembership
    );
    this.elements.radioField(
      "Allow business keep Membership Fees",
      businessDetails.allowBusinessKeepMemberShipFees
    );
    this.elements.radioField(
      "Include Subscription",
      businessDetails.includeSubscription
    );
    this.elements.radioField(
      "Pay Subscription to",
      businessDetails.paySubscriptionTo
    );
    this.elements.radioField(
      "Allow Service Consultations?",
      businessDetails.allowServiceConsultation
    );
    this.elements.radioField(
      "Allow In Session Consultations?",
      businessDetails.allowInServiceConsultation
    );
    this.elements.inputField(
      "Minimum Price ($)",
      businessDetails.travelMinPrice
    );
    this.elements.inputField(
      "Price Per Mile ($)",
      businessDetails.travelPricePerMile
    );
    this.elements
      .noPaneltyUpTo()
      .first()
      .clear()
      .type(businessDetails.noPaneltyUpTo1);
    this.elements
      .bookingChanges()
      .first()
      .clear()
      .type(businessDetails.bookingChanges1);
    this.elements
      .noPaneltyUpTo()
      .last()
      .clear()
      .type(businessDetails.noPaneltyUpTo2);
    this.elements
      .bookingChanges()
      .last()
      .clear()
      .type(businessDetails.bookingChanges2);
    this.elements.saveBtn().click();
    cy.wait(7000);
    this.elements.continueBtn().click();
    cy.wait(5000);
    this.elements.cancelBtn().click({ force: true });
  }

  addMobileBookingCommision(businessDetails) {
    this.elements.mobileBookingCommision().click()
    this.elements
      .businessCommissionType()
      .select(businessDetails.businessCommissionType);
    this.elements
      .businessCommissionPercentage()
      .clear()
      .type(businessDetails.businessCommissionPercentage);
    this.elements
      .whitelabelCommissionType()
      .select(businessDetails.whitelabelCommissionType);
    this.elements
      .whitelabelCommissionPercentage()
      .clear()
      .type(businessDetails.whitelabelCommissionPercentage);
    this.elements
      .telemedicineCommissionType()
      .select(businessDetails.telemedicineCommissionType);
    this.elements
      .telemedicineCommissionPercentage()
      .clear()
      .type(businessDetails.telemedicineCommissionPercentage);
    this.elements.mobileBookingCommisionSave().click({ force: true });
    cy.wait(7000);
  }
}

export default BusinessPage;
