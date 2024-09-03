import FilterPage from "../../pages/filterPage";
import HomePage from "../../pages/homePage";
import ProductDetailPage from "../../pages/productDetailPage";
import SearchResultsPage from "../../pages/searchResultsPage";

const homePage = new HomePage();
const filterPage = new FilterPage();
const searchResultsPage = new SearchResultsPage();
const productDetailPage = new ProductDetailPage();

describe("Amazon PDP Functionality", () => {
  let search = "Laptop";

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to filter and verify the Brands in title on VDP", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");
    productDetailPage.visitFirstDetailPage();

    productDetailPage.getTitle().should('contain', 'HP').and('contain', 'Laptop')
  });

  it("should be able to filter and verify the price on VDP", () => {
    const priceRangeFilter = { minRange: 40000, maxRange: 50000 };
    homePage.searchFor(search);
    filterPage.applyRangeFilter("Price", priceRangeFilter);

    productDetailPage.visitFirstDetailPage();
    cy.wait(200)
    productDetailPage.getPrice().then((priceText) => {
      const price = parseFloat(priceText.replace(/[₹,]/g, ""));
      cy.wrap(price).should(
        "be.within",
        priceRangeFilter.minRange - 1,
        priceRangeFilter.maxRange + 1
      );
    }); 
  });

  it("should be able to filter and verify the Brands in details on VDP", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");
    productDetailPage.visitFirstDetailPage();

    productDetailPage.getTechicalDetail("Brand").should('contain', 'HP')
  });

  it("should be able to filter with multiple filters - (Data driven test) - (VDP)", () => {
    cy.fixture("laptopDetailFilter").then((filter) => {
      filter.forEach((data) => {
        cy.log(`********** ${data.name} **********`);
        homePage.searchFor(data.category);

        searchResultsPage.getFirstResult().should("be.visible");
        searchResultsPage.getFirstResultTitle().contains(data.category);

        data.filters.forEach((fil) => {
          filterPage.applyFilter(fil.type, fil.title, fil.value);
        });

        productDetailPage.visitFirstDetailPage();
        cy.wait(200)
        data.expecteds.forEach((expected) => {
          if (expected.title === "Price") {
            productDetailPage.getPrice().then((priceText) => {
              const price = parseFloat(priceText.replace(/[₹,]/g, ""));
              cy.wrap(price).should(
                "be.within",
                expected.value.minRange - 1,
                expected.value.maxRange + 1
              );
            }); 
          } else {
            productDetailPage.getTechicalDetail(expected.title).should('contain', expected.value);
          }
        })

        cy.go('back')
      });
    });
  });
});
