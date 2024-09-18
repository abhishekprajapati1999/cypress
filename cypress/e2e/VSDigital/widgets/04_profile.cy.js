import HomePage from "../../../pages/VSDigital/widgets/homePage";
import Login from "../../../pages/VSDigital/widgets/login";
import Profile from "../../../pages/VSDigital/widgets/profile";
import generateSignUpDetails from "../../../utils/factories/widgets/signup";

const homePage = new HomePage();
const login = new Login();
const profile = new Profile();

describe("User profile validate", () => {
  let cred;

  before(() => {
    cy.fixture("VSDigital/widgets/signUpDetails").then((data) => {
      cred = data;
    });
  });

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to validate the profile info", () => {
    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);
    profile.visit();
    profile.validateDetails(cred);
  });

  it.only("should be able to upload profile image", () => {
    cy.intercept("POST", /\/api\/v1\/Media\/UploadMedia\/\d+\/\d+\/ProfileImage\/false/).as("updateProfilePhoto");
    
    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);
    profile.visit();
    cy.wait(5000);
    profile.elements.editBtn().click();
    profile.elements.photoUpdateBtn().click();
    profile.elements.photoInputFile().attachFile("VSDigital/image_under_2mb.jpeg");
    cy.wait(1000);
    profile.elements.photoUpdateSubmitBtn().click();
    profile.elements.cancelUpdateBtn().click();

    cy.wait("@updateProfilePhoto").then((interception) => {
        // Assert the response status code
        expect(interception.response.statusCode).to.eq(200);
  
        // Assert the response body data
        const responseBody = interception.response.body;
        expect(responseBody).to.have.property("status", "Success");
        expect(responseBody).to.have.property("data");
      });
  })

  it("should be able to edit profile successfully and validate info", () => {
    const {
      prefix,
      firstName,
      middleName,
      lastName,
      suffix,
      DOB,
      gender,
      heightInFeet,
      heightInInches,
      weight,
      secondaryAddress,
      landmark,
    } = generateSignUpDetails();

    cy.intercept("POST", "/api/v1/UserManagement/UpdateUser").as("updateUser");

    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);

    login.visit();
    cy.wait(1000);
    login.login(cred);
    cy.wait(5000);
    profile.elements.editBtn().click();
    profile.elements.profileEdit("Prefix").select(prefix);
    profile.elements.profileEdit("First Name").clear().type(firstName);
    profile.elements.profileEdit("Middle Name").clear().type(middleName);
    profile.elements.profileEdit("Last Name").clear().type(lastName);
    profile.elements.profileEdit("Suffix").clear().type(suffix);
    profile.elements.profileEdit("Date of Birth").clear().type(DOB);
    profile.elements.profileEdit("Gender").select(gender);
    profile.elements
      .profileEdit("Height")
      .clear()
      .type(heightInFeet * 12 + heightInInches);
    profile.elements.profileEdit("Weight").clear().type(weight);
    profile.elements
      .profileEdit("Apartment Number")
      .clear()
      .type(secondaryAddress);
    profile.elements.profileEdit("Landmark").clear().type(landmark);
    profile.elements.profileUpdateBtn().click();

    cy.wait("@updateUser").then((interception) => {
      // Assert the response status code
      expect(interception.response.statusCode).to.eq(200);

      // Assert the response body data
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("status", "Success");

      cy.readFile("cypress/fixtures/VSDigital/widgets/signUpDetails.json").then(
        (data) => {
          // Write the updated data back to the file
          cy.writeFile("cypress/fixtures/VSDigital/widgets/signUpDetails.json", {
            ...data,
            ...{
              prefix,
              firstName,
              middleName,
              lastName,
              suffix,
              DOB,
              gender,
              heightInFeet,
              heightInInches,
              weight,
              secondaryAddress,
              landmark,
            },
          });
        }
      );
    });
  });
});
