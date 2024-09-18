import { faker } from "@faker-js/faker";

function generateUserDetails(info) {
  const getRole = (info) => {
    if (info.role === "Admin" || info.role === "MD") {
      return {
        role: info.role,
        business: info.businessName,
      };
    } else {
      return {
        role: info.role,
        testAccount: info.testAccount,
      };
    }
  };

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    ...getRole(info),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.secondaryAddress(),
    country: "India",
    state: "Delhi",
    city: faker.location.city(),
    zip: faker.location.zipCode("######"),
  };
}
module.exports = generateUserDetails;
