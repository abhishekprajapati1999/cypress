import { faker } from "@faker-js/faker";

function generateSignUpDetails() {
    return {
        prefix: faker.helpers.arrayElement(["Dr.", "Mr.", "Mrs.", "Ms.", "Miss."]),
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        suffix: "test",
        email: faker.internet.email(),
        DOB: "09/10/1997",
        gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
        phone: faker.string.numeric(10),
        heightInFeet: faker.helpers.rangeToNumber({ min: 5, max: 10 }),
        heightInInches: faker.helpers.rangeToNumber({ min: 60, max: 80 }),
        weight: faker.helpers.rangeToNumber({ min: 130, max: 180 }),
        searchAddress: "55HW+72V, Bindwal, Uttar Pradesh 276121, India",
        secondaryAddress: faker.location.secondaryAddress(),
        landmark: "test",
        password: faker.internet.password({
            length: 15,
            pattern: /[A-Za-z0-9\d@$!%*?&]/,
            prefix: 'Test1$'
          }),
        
    }
}
module.exports = generateSignUpDetails;