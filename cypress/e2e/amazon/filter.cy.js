import FilterPage from "../../pages/filterPage";
import HomePage from "../../pages/homePage";
import SearchResultsPage from "../../pages/searchResultsPage";

const homePage = new HomePage();
const filterPage = new FilterPage();
const searchResultsPage = new SearchResultsPage();

describe("Amazon Filter Functionality", () => {
  let search = "Laptop";

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to filter and verify the Delivery Day", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Delivery Day", "Get It by Tomorrow");
    searchResultsPage
      .getFirstResultDeliveryInfo()
      .should("be.visible")
      .and("contain", "Tomorrow");
  });

  it("should be able to filter and verify the Brands", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");
    cy.wait(100)
    searchResultsPage
      .getFirstResultTitle()
      .should("be.visible")
      .and("contain", "HP");
  });

  it("should be able to filter and verify both Delivery Day and Brands", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Delivery Day", "Get It by Tomorrow");
    filterPage.applyCheckboxFilter("Brands", "HP");
    searchResultsPage
      .getFirstResultDeliveryInfo()
      .should("be.visible")
      .and("contain", "Tomorrow");
    searchResultsPage
      .getFirstResultTitle()
      .should("be.visible")
      .and("contain", "HP");
  });

  it("should be able to filter and verify the price", () => {
    const priceRangeFilter = { minRange: 40000, maxRange: 50000 };
    homePage.searchFor(search);
    filterPage.applyRangeFilter("Price", priceRangeFilter);
    searchResultsPage.getFirstResultTitle().contains(search);
    cy.wait(200)
    searchResultsPage.getFirstResultPrice().then((priceText) => {
      const price = parseFloat(priceText.replace(/[₹,]/g, ""));
      cy.wrap(price).should(
        "be.within",
        priceRangeFilter.minRange - 1,
        priceRangeFilter.maxRange + 1
      );
    }); 
  });

  it("should be able to filter 'Notebook Computer RAM Memory Size' and verify each result", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Notebook Computer RAM Memory Size", "16 GB");

    searchResultsPage.getAllResults().each((result) => {
      searchResultsPage.getFirstResult().should("be.visible");
      searchResultsPage
        .getFirstResultTitle(result)
        .should("be.visible")
        .and("contain", "16");
    });
  });

  it("should be able to filter with multiple filters - (Data driven test)", () => {
    cy.fixture("laptopFilter").then((filter) => {
      filter.forEach((data) => {
        cy.log(`********** ${data.name} **********`);
        homePage.searchFor(data.category);

        searchResultsPage.getFirstResult().should("be.visible");
        searchResultsPage.getFirstResultTitle().contains(data.category);

        data.filters.forEach((fil) => {
          filterPage.applyFilter(fil.type, fil.title, fil.value);

          switch (fil.where) {
            case "DeliveryInfo":
              searchResultsPage
                .getFirstResultDeliveryInfo()
                .should("be.visible")
                .and("contain", fil.expected);
              break;
            case "Title":
              searchResultsPage
                .getFirstResultTitle()
                .should("be.visible")
                .and("contain", fil.expected);
              break;
            case "Price":
              searchResultsPage.getFirstResultPrice().then((priceText) => {
                const price = parseFloat(priceText.replace(/[₹,]/g, ""));
                cy.wrap(price).should(
                  "be.within",
                  fil.expected.minRange - 1,
                  fil.expected.maxRange + 1
                );
              });
              break;
            default:
              cy.log("Invalid filter type");
          }
        });
      });
    });
  });
});
