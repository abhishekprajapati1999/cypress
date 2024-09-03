class ProductDetailPage {
  elements = {
    results: () => cy.get("div[data-component-type='s-search-result']"),
    price: () =>
      cy.get(
        '.a-spacing-none > .a-price > [aria-hidden="true"] > .a-price-whole'
      ),
    title: () => cy.get("span#productTitle"),
    technicalDetailsSection: () => cy.get("#productDetails_techSpec_section_1"),
    deliveryDay: "span.a-color-base.a-text-bold",
    resultLink: "h2 a",
  };

  visitFirstDetailPage() {
    return this.elements
      .results()
      .first()
      .find(this.elements.resultLink)
      .invoke("attr", "target", "_self")
      .click();
  }

  getTitle() {
    return this.elements.title();
  }

  getPrice() {
    return this.elements.price().invoke("text");
  }

  getTechicalDetail(headerText) {
    return this.elements
      .technicalDetailsSection()
      .contains("th", headerText)
      .parent()
      .find("td")
      .first()
      .invoke("text")
      .then((text) => {
        return text.trim();
      });
  }
}

export default ProductDetailPage;
