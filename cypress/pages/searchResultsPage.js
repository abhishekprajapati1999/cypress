class SearchResultsPage {
  elements = {
    searchTxt: () => cy.get(".a-color-state.a-text-bold"),
    results: () => cy.get("div[data-component-type='s-search-result']"),
    deliveryDay: "span.a-color-base.a-text-bold",
    title: "h2 a span",
    price: 'span.a-price-whole'
  };

  getSearchTxt() {
    return this.elements.searchTxt();
  }

  getResultCounts() {
    return this.elements.results().its("length"); 
  }

  getFirstResult() {
    return this.elements.results().first(); 
  }

  getAllResults() {
    return this.elements.results();
  }

  // Method to get the title of the first result
  getFirstResultTitle() {
    return this.getFirstResult().find(this.elements.title);
  }

  getResultTitle(result) {
    return cy.wrap(result).find(this.elements.title);
  }

  getFirstResultDeliveryInfo() {
    return this.getFirstResult().find(this.elements.deliveryDay);
  }

  getResultDeliveryInfo(result) {
    return cy.wrap(result).find(this.elements.deliveryDay);
  }

  getFirstResultPrice() {
    return this.getFirstResult().find(this.elements.price).invoke('text');
  }
}

export default SearchResultsPage;
