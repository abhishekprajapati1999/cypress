class PaymentMethodPage {
  elements = {
    buyBtn: () => cy.get("input[value='Proceed to checkout']"),
    useAddressBtn: () =>
      cy
        .get("input[data-testid='Address_selectShipToThisAddress']"),
    paymentMethods: () => cy.get("div[class='a-box'] div[class='a-box-inner']")
  };

  proceedToPaymentMethods() {
    this.elements.buyBtn().click();
    this.elements.useAddressBtn().click();
    return 
  }

  paymentMethods(paymentType) {
    return this.elements.paymentMethods().contains(paymentType);
  }
}

export default PaymentMethodPage;
