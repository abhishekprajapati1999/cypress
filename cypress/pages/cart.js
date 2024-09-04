class CartPage {
  elements = {
    cartBtn: () => cy.get("#nav-cart"),
    cartItems: () =>
      cy
        .get("div[data-name='Active Items']")
        .find(".a-row.sc-list-item.sc-java-remote-feature"),
    addToCart: () => cy.get('input#add-to-cart-button'),
    closeCartSlide: () => cy.get("#attach-close_sideSheet-link"),
    subTotalAmount: () => cy.get("span[id='sc-subtotal-amount-activecart'] span[class='a-size-medium a-color-base sc-price sc-white-space-nowrap']"),
    title: "span.a-truncate-full",
    deleteBtn: "input[value='Delete'][type*='submit']",
  };

  visit() {
    return this.elements.cartBtn().click();
  }

  addToCart() {
    this.elements.addToCart().then((buttons) => {
        if (buttons.length > 1) {
            // If multiple buttons are found, click the first one
            cy.wrap(buttons).filter('.a-button-input').eq(1).click()
            cy.wait(4000)
        } else if (buttons.length === 1) {
            // If only one button is found, click it
            cy.wrap(buttons).click();
        } else {
            // Handle the case where no buttons are found
            cy.log("No 'Add to Cart' button found");
        }
    });
    cy.wait(100)
    return this.elements.closeCartSlide().click();
  }

  getCartItemCount() {
    return this.elements.cartItems().its("length");
  }

  getFirstCartItemTitle() {
    return this.elements.cartItems().first().find(this.elements.title);
  }

  getCartItems() {
    return this.elements.cartItems();
  }

  getCartSubTotal() {
    return this.elements.subTotalAmount().invoke('text');
  }

  removeCartItem(item) {
    return cy.wrap(item).find(this.elements.deleteBtn).click();
  }
}

export default CartPage;
