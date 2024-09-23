import HomePage from "./homePage";
import * as locators from "../../../locators/VSDigital/widgets/signup.json";

const home = new HomePage();

class SignUp {
  elements = {
    ...locators,
    signUpVisitBtn: () =>
      cy.get(this.elements.signUpVisitBtnLocator).contains("Sign up"),
    prefix: () => cy.get(this.elements.prefixLocator),
    firstName: () => cy.get(this.elements.firstNameLocator),
    middleName: () => cy.get(this.elements.middleNameLocator),
    lastName: () => cy.get(this.elements.lastNameLocator),
    enterSuffix: () => cy.get(this.elements.enterSuffixLocator),
    email: () => cy.get(this.elements.emailLocator),
    DOB: () => cy.get(this.elements.DOBLocator),
    gender: () => cy.get(this.elements.genderLocator),
    phone: () => cy.get(this.elements.phoneLocator),
    heightInFeet: () => cy.get(this.elements.heightInFeetLocator),
    heightInInches: () => cy.get(this.elements.heightInInchesLocator),
    weight: () => cy.get(this.elements.weightLocator),
    searchAddress: () => cy.get(this.elements.searchAddressLocator),
    searchedAddressSelect: () =>
      cy.get(this.elements.searchedAddressSelectLocator),
    addressLine2: () => cy.get(this.elements.addressLine2Locator),
    landmark: () => cy.get(this.elements.landmarkLocator),
    zipCode: () => cy.get(this.elements.zipCodeLocator),
    password: () => cy.get(this.elements.passwordLocator),
    confirmPassword: () => cy.get(this.elements.confirmPasswordLocator),
    clickSignUp: () => cy.get(this.elements.clickSignUpLocator),
  };

  visit() {
    home.visit();
    this.elements.signUpVisitBtn().click();
    return;
  }

  signUp(info) {
    this.elements.prefix().select(info.prefix);
    this.elements.firstName().type(info.firstName);
    this.elements.middleName().type(info.middleName);
    this.elements.lastName().type(info.lastName);
    this.elements.enterSuffix().type(info.suffix);
    this.elements.email().type(info.email);
    this.elements.DOB().type(info.DOB);
    this.elements.gender().select(info.gender);
    this.elements.phone().type(info.phone);
    this.elements.heightInFeet().type(info.heightInFeet);
    this.elements.heightInInches().type(info.heightInInches);
    this.elements.weight().type(info.weight);
    this.elements.searchAddress().type(info.searchAddress);
    this.elements.searchedAddressSelect().first().click();
    this.elements.addressLine2().type(info.secondaryAddress);
    this.elements.landmark().type(info.landmark);
    this.elements.password().type(info.password);
    this.elements.confirmPassword().type(info.password);
    this.elements.clickSignUp().click();
    return;
  }
}

export default SignUp;
