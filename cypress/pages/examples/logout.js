class Logout {
    elements = {
        logoutBtn: () => cy.get("li[class='pointer ng-star-inserted'] a"), 
        confirmBtn: () => cy.get("button[class='mat-focus-indicator mat-raised-button mat-button-base mat-primary']"),
        cancelBtn: () => cy.get(".mat-focus-indicator.mat-button.mat-button-base.cdk-focused.cdk-program-focused"),
        logoutTxt: () => cy.get("div[class='mat-dialog-content'] p")
    };

    //method for logout
    clickLogout() {
        this.elements.logoutBtn().click();
        this.elements.confirmBtn().click();
    }
}

export default Logout;
  