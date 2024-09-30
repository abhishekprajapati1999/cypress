import HomePage from "../../../pages/VSDigital/widgets/homePage";
import Login from "../../../pages/VSDigital/widgets/login";
import BookingPage from "../../../pages/VSDigital/widgets/booking";
import generateSignUpDetails from "../../../utils/factories/widgets/signup";

const homePage = new HomePage();
const login = new Login();
const booking = new BookingPage();

describe("Booking validate", () => {
  let cred;
  let serviceDetails;
  let preAssessmentDetails;
  let signUpDetails;
  let businessDetails;
  let hcpDetails;

  before(() => {
    cy.fixture("VSDigital/widgets/signUpDetails").then((data) => {
      cred = data;
    });
    cy.fixture("VSDigital/backOffice/businessDetails").then((data) => {
      businessDetails = data;
    });
    cy.fixture("VSDigital/backOffice/serviceDetails").then((data) => {
      serviceDetails = data;
    });
    cy.fixture("VSDigital/backOffice/preAssessmentDetails").then((data) => {
      preAssessmentDetails = data;
    });
    cy.fixture("VSDigital/backOffice/hcpDetails").then((data) => {
      hcpDetails = data;
    });
    cy.fixture("VSDigital/widgets/signUpDetails").then((data) => {
      signUpDetails = data;
    });
  });

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to book the service", () => {
    cy.intercept("POST", "/api/v1/CheckinBooking/SaveBMIDetails").as("saveBMI");
    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);
    cy.wait(10000);
    booking.visit();
    cy.wait(5000);
    booking.service("Mobile/Callout");

    // Read Me: Service Booking Information
    booking.serviceBookingFlow(serviceDetails);

    // Pre Assessment validation
    booking.preAssessmentFLow(preAssessmentDetails);

    // Medical Consent
    booking.medicalConsentFlow(signUpDetails);

    // consultation booking
    booking.consultationBooking();

    // Booking Summary
    booking.bookingSummaryFlow(signUpDetails);

    // Payment
    booking.paymentFlow();
    
    // Validate Booking service
    const bookingDetails = {
      serviceName: serviceDetails.serviceName,
      sellingPrice: serviceDetails.sellingPrice,
      shippingCost: serviceDetails.shippingCost,
      platformSeriveFeeValue: businessDetails.platformSeriveFeeValue,
      platformSeriveFeeType: businessDetails.platformSeriveFeeType,
      consultationCommissionLevel: serviceDetails.consultationCommissionLevel,
      consultationMargin: serviceDetails.consultationMargin,
      "Level 1": hcpDetails.level1,
      "Level 2": hcpDetails.level2,
      "Level 3": hcpDetails.level3,
      "Level 4": hcpDetails.level4
    }
    booking.validateBooking(bookingDetails);
  });
});
