import HomePage from "./homePage";
const home = new HomePage();

class SignUp {
  elements = {
    signUpVisitBtn: () =>
      cy.get("button.nav-btn.nav-btn.btn-primary").contains("Sign up"),
    prefix: () => cy.get("select[name='prefix']"),
    firstName: () => cy.get("input[placeholder='First Name']"),
    middleName: () => cy.get("input[placeholder='Middle Name']"),
    lastName: () => cy.get("input[placeholder='Last Name']"),
    enterSuffix: () => cy.get("input[placeholder='Enter Suffix']"),
    email: () => cy.get("input[placeholder='Email']"),
    DOB: () => cy.get("input[placeholder='Date of Birth']"),
    gender: () => cy.get("select[name='gender']"),
    phone: () => cy.get("input[placeholder='Phone']"),
    heightInFeet: () => cy.get("input[placeholder='Height in Feet']"),
    heightInInches: () => cy.get("input[placeholder='Height in Inches']"),
    weight: () => cy.get("input[placeholder='Weight']"),
    searchAddress: () => cy.get("input[placeholder='Search your address']"),
    searchedAddressSelect: () =>
      cy.get(".list-group-item.list-group-item-action"),
    addressLine2: () =>
      cy.get(
        "input[placeholder='Apt, suite, unit, building, floor, etc. (optional)']"
      ),
    landmark: () => cy.get("input[placeholder='Enter Landmark (optional)']"),
    zipCode: () => cy.get("input[placeholder='Zip/Postal Code']"),
    password: () => cy.get("input[placeholder='Password']"),
    confirmPassword: () => cy.get("input[placeholder='Confirm Password']"),
    clickSignUp: () => cy.get("button[class='btn cm-btn-color form-control']"),
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
