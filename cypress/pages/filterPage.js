class FilterPage {
  elements = {
    filter: () => cy.get("#s-refinements"),
    priceMinRange: () => cy.get('input[name="low-price"]'),
    priceMaxRange: () => cy.get('input[name="high-price"]'),
    priceBtn: () => cy.get("input.a-button-input"),
  };

  // Method to apply a checkbox filter (e.g., Brand, Category)
  applyCheckboxFilter(filterCategory, filterOption) {
    this.elements.filter().contains(filterCategory).scrollIntoView(); // Scroll to the filter section
    this.elements.filter().contains(filterOption).click();
  }

  // Method to apply a range filter (e.g., Price)
  applyRangeFilter(filterCategory, filterOption) {
    const maxRange = filterOption.maxRange;
    const minRange = filterOption.minRange;
    this.elements.filter().contains(filterCategory).scrollIntoView();
    this.elements.priceMinRange().type(minRange, { force: true });
    this.elements.priceMaxRange().type(maxRange, { force: true });
    this.elements.priceBtn().click({ force: true });
  }

  // Method to apply a link or clickable filter
  applyLinkFilter(filterCategory, filterOption) {
    this.elements.filter().contains(filterCategory).scrollIntoView();
    this.elements.filter().contains(filterOption).click();
  }

  // Generic filter
  applyFilter(filterType, filterCategory, filterOption) {
    switch (filterType) {
      case "checkbox":
        this.applyCheckboxFilter(filterCategory, filterOption);
        break;
      case "range":
        this.applyRangeFilter(filterCategory, filterOption);
        break;
      case "link":
        this.applyLinkFilter(filterCategory, filterOption);
        break;
      default:
        cy.log("Invalid filter type");
    }
    return;
  }
}

export default FilterPage;
