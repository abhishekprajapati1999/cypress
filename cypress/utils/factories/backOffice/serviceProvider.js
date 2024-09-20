import { faker } from "@faker-js/faker";

function generateServiceProviderDetails(info) {
  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    business: info.businessName,
    DOB: info.DOB || "09/10/1997",
    gender:
      info.gender || faker.helpers.arrayElement(["Male", "Female", "Other"]),
    testAccount: info.testAccount || "No",
    allowSPToClaimOtherBookings: info.allowSPToClaimOtherBookings || "No",
    biography: faker.word.words({ count: 5 }),
    taxIDNo: info.taxIDNo || faker.word.words() + faker.string.numeric(5),
    defaultTimeZone: info.defaultTimeZone || "India Standard Time",
    commissionOrProfitShare:
      info.commissionOrProfitShare ||
      faker.helpers.arrayElement(["Commission", "Profit Share"]),
    licenseType: faker.word.words(1).toUpperCase(),
    licenseNumber: "#" + faker.word.words(1).toUpperCase() + faker.string.numeric(5),
    licenseExpiry: info.licenseExpiry || "09/10/2045",
    stateLicenseValidIn: info.stateLicenseValidIn || "Indiana",
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    country: "India",
    state: "Delhi",
    city: faker.location.city(),
    zip: faker.location.zipCode("######"),
  };
}
module.exports = generateServiceProviderDetails;
