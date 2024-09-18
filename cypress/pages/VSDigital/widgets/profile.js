class Profile {
  elements = {
    profileTab: () => cy.get("nav ul li").contains("Profile"),
    profileData: (labelText) =>
      cy.contains("label", labelText).parent().find("input.form-control"),
    profileLocation: () => cy.get("#location"),
    editBtn: () => cy.get("button[class='btn cm-btn-color undefined']"),
    profileEdit: (labelText) =>
        cy.contains("label", labelText).parent().find(".form-control"),
    profileUpdateBtn: () => cy.get("button[type='submit']"),
    photoInputFile: () => cy.get('input[type="file"]'),
    photoUpdateBtn: () => cy.get(".btn.btn-primary.btn-sm.undefined"),
    photoUpdateSubmitBtn: () => cy.get("button[class='btn cm-btn-color btn btn-primary']"),
    cancelUpdateBtn: () => cy.get("button[class='btn cm-btn-tertiary']")
  };

  visit() {
    return this.elements.profileTab().click();
  }

  validateDetails(info) {
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
