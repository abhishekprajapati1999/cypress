import * as locators from "../../../locators/VSDigital/widgets/profile.json";

class Profile {
  elements = {
    ...locators,
    profileTab: () =>
      cy.get(this.elements.profileTabLocator).contains("Profile"),
    profileData: (labelText) =>
      cy
        .contains(this.elements.profileDataLocator, labelText)
        .parent()
        .find("input.form-control"),
    profileLocation: () => cy.get(this.elements.profileLocationLocator),
    editBtn: () => cy.get(this.elements.editBtnLocator),
    profileEdit: (labelText) =>
      cy
        .contains(this.elements.profileEditLocator, labelText)
        .parent()
        .find(".form-control"),
    profileUpdateBtn: () => cy.get(this.elements.profileUpdateBtnLocator),
    photoInputFile: () => cy.get(this.elements.photoInputFileLocator),
    photoUpdateBtn: () => cy.get(this.elements.photoUpdateBtnLocator),
    photoUpdateSubmitBtn: () =>
      cy.get(this.elements.photoUpdateSubmitBtnLocator),
    cancelUpdateBtn: () => cy.get(this.elements.cancelUpdateBtnLocator),
  };

  visit() {
    return this.elements.profileTab().click();
  }

  validateDetails(info) {
    cy.wait(5000);
    this.elements.profileData("Prefix").should("have.value", info.prefix);
    this.elements
      .profileData("First Name")
      .should("have.value", info.firstName);
    this.elements
      .profileData("Middle Name")
      .should("have.value", info.middleName);
    this.elements.profileData("Last Name").should("have.value", info.lastName);
    this.elements.profileData("Suffix").should("have.value", info.suffix);
    this.elements.profileData("Email").should("have.value", info.email);
    this.elements.profileData("Phone").should("have.value", info.phone);
    // this.elements.profileData("Date of Birth").should("have.value", info.DOB);
    this.elements.profileData("Gender").should("have.value", info.gender);
    this.elements
      .profileData("Height")
      .should("have.value", info.heightInFeet * 12 + info.heightInInches);
    this.elements.profileData("Weight").should("have.value", info.weight);
    this.elements
      .profileData("Apartment Number")
      .should("have.value", info.secondaryAddress);
    this.elements.profileData("Landmark").should("have.value", info.landmark);
    this.elements.profileLocation().should("have.value", info.searchAddress);
    return;
  }
}

export default Profile;
