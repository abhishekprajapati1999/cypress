import { faker } from "@faker-js/faker";

function generateHCPDetails(info) {
  return {
    vSDigitalDoctorNetwork: info.vSDigitalDoctorNetwork || "Yes",
    prefix: faker.helpers.arrayElement(["Dr.", "Mr.", "Mrs.", "Ms.", "Miss."]),
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    suffix: "test",
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    business: info.businessName,
    DOB: info.DOB || "09/10/1997",
    gender:
      info.gender || faker.helpers.arrayElement(["Male", "Female", "Other"]),
    testAccount: info.testAccount || "No",
    biography: faker.word.words({ count: 5 }),
    taxIDNo: info.taxIDNo || faker.word.words() + faker.string.numeric(5),
    defaultTimeZone: info.defaultTimeZone || "India Standard Time",
    canDoMedicalConsult: info.canDoMedicalConsult || "Yes",
    candoMedicalScreenings: "Yes",
    NPINumber: faker.string.numeric(10),
    DEANumber: 'AZ' + faker.string.numeric(7),
    verification: faker.helpers.arrayElement(["Verified"]),
    licenseType: faker.word.words(1).toUpperCase(),
    licenseNumber:
      "#" + faker.word.words(1).toUpperCase() + faker.string.numeric(5),
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
module.exports = generateHCPDetails;
