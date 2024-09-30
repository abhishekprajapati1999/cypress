import { faker } from "@faker-js/faker";
import * as locators from "../../../locators/VSDigital/widgets/booking.json";

class BookingPage {
  elements = {
    ...locators,
    optionTabs: () => cy.get(this.elements.optionTabsLocator),
    selectServiceFromList: (serviceName) =>
      cy
        .get(this.elements.serviceListLocator)
        .contains("span", serviceName)
        .closest("div.service-card"),
    serviceBookingInformationReadMe: () =>
      cy.get(this.elements.serviceBookingInformationReadMeLocator),
    continueBtn: () => cy.get(this.elements.continueBtnLocator),
    submitBtn: () => cy.get(this.elements.submitBtnLocator),
    preAssessmentList: () => cy.get(this.elements.preAssessmentListLocator),
    preAssessmentTextList: () =>
      cy.get(this.elements.preAssessmentTextListLocator),
    currentAge: () => cy.get(this.elements.currentAgeLocator),
    currentWeight: () => cy.get(this.elements.currentWeightLocator),
    currentHeightFeet: () => cy.get(this.elements.currentHeightFeetLocator),
    currentHeightInches: () => cy.get(this.elements.currentHeightInchesLocator),
    inputField: (field) =>
      cy
        .get(this.elements.inputFieldLocator)
        .contains("label", field)
        .parent()
        .find("input"),
    nextBtn: () => cy.get(this.elements.nextBtnLocator),
    textareaField: (field) =>
      cy
        .get(this.elements.inputFieldLocator)
        .contains("label", field)
        .parent()
        .find("textarea"),
    selectField: (field) =>
      cy
        .get(this.elements.selectFieldLocator)
        .contains("label", field)
        .parent()
        .find("select"),
    medicalConsents: () => cy.get(this.elements.medicalConsentLocator),
    signatureAgreeBtn: () => cy.get(this.elements.signatureAgreeBtnLocator),
    addressText: () => cy.get(this.elements.addressTextLocator),
    bookingDetail: (field) =>
      cy
        .contains(this.elements.bookingDetailFieldLocator, field)
        .parent()
        .find(this.elements.bookingDetailValueLocator),
    totalAmount: () => cy.get(this.elements.totalAmountConfirmLocator),
    addPaymentMethod: () => cy.get(this.elements.addPaymentMethodLocator),
    newCard: () => cy.get(this.elements.newCardLocator),
    iframe: () => cy.get(this.elements.iframeLocator),
    payButton: () => cy.get(this.elements.payButtonLocator),
    consultBookingButton: () =>
      cy.get(this.elements.consultBookingButtonLocator),
    checkupSlot: () => cy.get(this.elements.checkupSlotLocator),
    consultBookingContinueBtn: () =>
      cy.get(this.elements.consultBookingContinueBtnLocator),
    confirmBookingTxt: () => cy.get(this.elements.confirmBookingTxtLocator),
  };

  visit() {
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      return cy.visit(data.widgetLink);
    });
  }

  service(type) {
    return this.elements.optionTabs().contains(type).click();
  }

  selectAndClickBookService(serviceDetails) {
    const service =
      serviceDetails.serviceName +
      (serviceDetails.setServiceAsPatientSpecific === "Yes"
        ? " - Patient Specific Service"
        : "");
    cy.log(service);
    return this.elements
      .selectServiceFromList(service)
      .contains("button", "Book Service")
      .click();
  }

  validateServiceBookingInformation(PSIInfo) {
    return this.elements
      .serviceBookingInformationReadMe()
      .invoke("text")
      .should("contain", PSIInfo);
  }

  validateQNAandSelectOptions(preAssessmentDetails) {
    const qnaWithYesOrNo = preAssessmentDetails.questionsAndAnswers.filter(
      (fil) => !fil.answer.includes("Text")
    );
    this.elements.preAssessmentList().each((ele, ind) => {
      cy.wrap(ele)
        .invoke("text")
        .should("contain", qnaWithYesOrNo[ind].question);
      cy.wrap(ele)
        .parent()
        .contains(
          "div",
          qnaWithYesOrNo[ind].answer === "Either"
            ? "Yes"
            : qnaWithYesOrNo[ind].answer
        )
        .click();
    });
    return;
  }

  addTextQNA(preAssessmentDetails) {
    const textQNA = preAssessmentDetails.questionsAndAnswers.filter(
      (fil) => fil.answer === "Text"
    );
    this.elements.preAssessmentTextList().then((list) => {
      Cypress._.slice(list, 0, textQNA.length).forEach((ele, ind) => {
        cy.wrap(ele)
          .parent()
          .parent()
          .find("textarea")
          .clear()
          .type(`Testing ${ind}`);
      });
    });
    return;
  }

  generateHeightWeightAboveMinBMI(minimumBMI) {
    const totalInches = Math.floor(Math.random() * (78 - 60 + 1)) + 60;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    const minWeight = ((minimumBMI + 2) * Math.pow(totalInches, 2)) / 703;
    const weight = minWeight + Math.random() * 20;
    const actualBMI = (weight / Math.pow(totalInches, 2)) * 703;

    return {
      heightInFeet: feet,
      heightInInches: inches,
      weight: weight.toFixed(0),
      actualBMI: actualBMI.toFixed(0),
    };
  }

  updateBMIRecords(record) {
    const data = this.generateHeightWeightAboveMinBMI(record.minimumBMI);
    this.elements
      .currentWeight()
      .clear()
      .type(record.weight || data.weight);
    this.elements
      .currentHeightFeet()
      .clear()
      .type(record.heightInFeet || data.heightInFeet);
    this.elements
      .currentHeightInches()
      .clear()
      .type(record.heightInInches || data.heightInInches);
    return;
  }

  signature() {
    cy.get(this.elements.signatureCanvasLocator).as("signCanvas");

    // Force click on the canvas
    cy.get("@signCanvas").click({ force: true });

    // Verify click location
    cy.get("@signCanvas").then((canvas) => {
      const rect = canvas[0].getBoundingClientRect();
      cy.get("@signCanvas").trigger("click", {
        clientX: rect.left + 10,
        clientY: rect.top + 10,
      });
    });
  }

  serviceBookingFlow(serviceDetails) {
    this.selectAndClickBookService(serviceDetails);
    this.validateServiceBookingInformation(
      serviceDetails.patientSpecificInformationPage
    );
    cy.wait(2000);
    this.elements.continueBtn().contains("Continue").click();
    cy.wait(2000);
  }

  preAssessmentFLow(preAssessmentDetails) {
    this.validateQNAandSelectOptions(preAssessmentDetails);
    cy.wait(2000);
    this.elements.continueBtn().contains("Next").click();
    cy.wait(2000);
    this.addTextQNA(preAssessmentDetails);
    this.updateBMIRecords({ minimumBMI: preAssessmentDetails.minimumBMI });
    cy.wait(2000);
    this.elements.continueBtn().contains("Complete my assesment").click();
    cy.wait(1000);
    this.elements.submitBtn().click();
    cy.wait(5000);
    cy.wait("@saveBMI").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");
    });
  }

  medicalConsentFlow(signUpDetails) {
    this.elements.continueBtn().then(($addConsentBtn) => {
      cy.wrap($addConsentBtn)
        .invoke("text")
        .then((text) => {
          if (text === "Add Medical Consent") {
            cy.log(text);
            cy.wrap($addConsentBtn).click();
            cy.wait(4000);
            this.elements
              .inputField("Name")
              .should(
                "have.value",
                signUpDetails.firstName + " " + signUpDetails.lastName
              );
            this.elements
              .selectField("Gender")
              .find("option:selected")
              .should("contain.text", signUpDetails.gender);
            this.elements
              .inputField("Date of Birth")
              .should("have.value", signUpDetails.DOB);
            cy.wait(2000);
            this.elements.nextBtn().click();
            cy.wait(1000);

            this.elements.medicalConsents().each((ele, ind) => {
              cy.wrap(ele)
                .find("input")
                .eq(ind % 2 === 0 ? 0 : 1)
                .check();
            });
            this.elements
              .textareaField(
                "Please explain in as much detail as possible any of the above questions you have answered yes to"
              )
              .clear()
              .type("Test");
            this.elements
              .textareaField(
                "Please list and describe in as much detail as possible any allergies you have"
              )
              .clear()
              .type("Test");
            this.elements
              .textareaField(
                "Please list and describe in as much detail as possible your medical history"
              )
              .clear()
              .type("Test");
            cy.wait(2000);
            this.elements.nextBtn().contains("Next").click();
            cy.wait(1000);
            cy.wait(2000);
            this.elements.nextBtn().contains("Sign").click();
            cy.wait(1000);
            this.signature();
            this.elements.signatureAgreeBtn();
            cy.wait(2000);
          } else {
            cy.wrap($addConsentBtn).click();
          }
        });
    });
  }

  bookingSummaryFlow(signUpDetails) {
    cy.wait(2000);
    // this.elements.bookingDetail("Booking amount").invoke("text").should("have.text", '$'+)
    this.elements.continueBtn().contains("Proceed To Payment").click();
    cy.wait(5000);
  }

  consultationBooking() {
    cy.wait(2000);
    this.elements
      .consultBookingButton()
      .contains("Proceed To Book Consult")
      .click();
    cy.wait(2000);
    this.elements.checkupSlot().eq(4).click();
    this.elements.consultBookingContinueBtn().click();
  }

  paymentFlow() {
    // this.elements.totalAmount()
    this.elements.addPaymentMethod().click();
    cy.wait(4000);
    this.elements.newCard().then(($card) => {
      cy.wrap($card).eq(0).click();
      if ($card.length === 1) {
        cy.wait(1000);
        this.elements
          .iframe()
          .its("0.contentDocument.body")
          .find(this.elements.cardNumberLocator)
          .type("3566000020000410");
        this.elements
          .iframe()
          .its("0.contentDocument.body")
          .find(this.elements.expiryDateLocator)
          .type("0226");
        this.elements
          .iframe()
          .its("0.contentDocument.body")
          .find(this.elements.cvvLocator)
          .type("123");
        this.elements
          .iframe()
          .its("0.contentDocument.body")
          .find(this.elements.payButtonLocator)
          .click();
      }
    });
    cy.wait(5000);
    this.elements.continueBtn().contains("Continue").click();
    cy.wait(5000);
    this.elements.continueBtn().contains("Confirm Booking").click();
  }

  calculateServiceFee = (details) => {
    if (details.platformSeriveFeeType === "Percentage (%)") {
      return (
        (details.platformSeriveFeeValue / 100) *
        details.sellingPrice
      ).toFixed(2);
    } else {
      return details.platformSeriveFeeValue.toFixed(2);
    }
  };

  calculateConsultationFee(details) {
    return (
      details[details.consultationCommissionLevel] + details.consultationMargin
    );
  }

  validateBooking(details) {
    cy.wait(7000);
    this.elements
      .confirmBookingTxt()
      .should("have.text", "Consultation Confirmed");

    // Booking details
    this.elements
      .bookingDetail(details.serviceName)
      .should("contain", details.sellingPrice);
    this.elements
      .bookingDetail("Consultation Fees")
      .should("contain", this.calculateConsultationFee(details));
    this.elements
      .bookingDetail("Service Fee")
      .should("contain", this.calculateServiceFee(details));
    this.elements
      .bookingDetail("Shipping Cost")
      .should("contain", details.shippingCost);

    const bookingAmount =
      parseFloat(details.sellingPrice) +
      parseFloat(this.calculateConsultationFee(details)) +
      parseFloat(this.calculateServiceFee(details)) +
      parseFloat(details.shippingCost);
    this.elements
      .bookingDetail("Booking amount")
      .should("contain", bookingAmount);
  }
}

export default BookingPage;
