import { faker } from "@faker-js/faker";

function generateBusinessDetails() {
  return {
    businessName: 'Test_' + faker.company.name() + "_" + faker.string.numeric(5),
    status: "Active",
    phone: faker.string.numeric(10),
    note: faker.word.words(5),
    dockerNetwork: "Yes",
    masterBusiness: "No",
    subscribeToMobileMedIV: "No",
    addServicesOwn: "Yes",
    profileTagline: faker.word.words({ count: 5 }),
    profileDescription: faker.word.words({ count: { min: 5, max: 10 } }),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    country: "India",
    state: "Delhi",
    city: faker.location.city(),
    zip: faker.location.zipCode("######"),
    defaulyBusinesss: "No",
    testBusiness: "No",
    groupDiscount: faker.number.int({ min: 10, max: 100 }),
    noOfPersonGroupDiscount: faker.number.int({ min: 10, max: 100 }),
    platformSeriveFeeType: faker.helpers.arrayElement([
      
      "Percentage (%)",
    ]),
    platformSeriveFeeValue: faker.number.int({ min: 10, max: 100 }),
    allowBussinesToTakeCashPayment: "No",
    allowBusinessToAddMembership: "No",
    allowBusinessKeepMemberShipFees: "No",
    includeSubscription: "No",
    paySubscriptionTo: "Whitelabel",
    allowServiceConsultation: "Yes",
    allowInServiceConsultation: "Yes",
    travelMinPrice: faker.number.int({ min: 10, max: 100 }),
    travelPricePerMile: faker.number.int({ min: 1, max: 10 }),
    noPaneltyUpTo1: faker.number.int({ min: 10, max: 24 }),
    bookingChanges1: faker.number.int({ min: 10, max: 100 }),
    noPaneltyUpTo2: faker.number.int({ min: 10, max: 24 }),
    bookingChanges2: faker.number.int({ min: 10, max: 100 }),

    businessCommissionType: faker.helpers.arrayElement(["Gross"]),
    businessCommissionPercentage: faker.number.int({ min: 10, max: 50 }),
    whitelabelCommissionType: faker.helpers.arrayElement([
      "Net Profit"
    ]),
    whitelabelCommissionPercentage: '100',
    telemedicineCommissionType: faker.helpers.arrayElement([
      "Gross",
    ]),
    telemedicineCommissionPercentage: faker.number.int({ min: 10, max: 50 }),
  };
}
module.exports = generateBusinessDetails;
