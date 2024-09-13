import Auth from "../../../pages/examples/auth";
import PaymentMethodPage from "../../../pages/examples/paymentMethod";
import CartPage from "../../../pages/examples/cart";
import FilterPage from "../../../pages/examples/filterPage";
import HomePage from "../../../pages/examples/homePage";
import ProductDetailPage from "../../../pages/examples/productDetailPage";
import SearchResultsPage from "../../../pages/examples/searchResultsPage";

const auth = new Auth();
const homePage = new HomePage();
const cartPage = new CartPage();
const filterPage = new FilterPage();
const searchResultsPage = new SearchResultsPage();
const productDetailPage = new ProductDetailPage();
const paymentMethodPage = new PaymentMethodPage();

describe("Amazon available payment methods test cases", () => {
  let search = "Laptop";

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to check the payment methods", () => {
    auth.signIn(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    homePage.visit();
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");

    productDetailPage.visitFirstDetailPage();
    // Add item to cart
    cartPage.addToCart();

    cartPage.visit();
    cartPage.getCartItemCount().should("eq", 1);

    paymentMethodPage.proceedToPaymentMethods();
    cy.wait(6000);
    paymentMethodPage.paymentMethods("Credit or debit card").should("exist");
    cy.go("back");
    cy.go("back");
    cartPage.removeAllCartItems(1);
  });

  it("should be able to search, filter, add to cart and check payment methods with multiple items - (Data driven test)", () => {
    cy.fixture("examples/paymentMethodAvailable").then((filter) => {
      auth.signIn(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
      homePage.visit();
      filter.forEach((data) => {
        cy.log(`********** ${data.name} **********`);

        data.items.forEach((item) => {
          homePage.searchFor(item.search);
          item.filters.forEach((fil) => {
            filterPage.applyFilter(fil.type, fil.title, fil.value);
          });
          searchResultsPage.getFirstResult().should("be.visible");
          productDetailPage.visitFirstDetailPage();
          cy.wait(200);

          // Add item to cart
          cartPage.addToCart();
        });

        cartPage.visit();
        cartPage.getCartItemCount().should("eq", data.items.length);

        paymentMethodPage.proceedToPaymentMethods();
        cy.wait(4000);
        data.expecteds.forEach((method) => {
          paymentMethodPage.paymentMethods(method).should("exist");
        });

        cy.go("back");
        cy.go("back");

        cartPage.removeAllCartItems(data.items.length);

        auth.signOut();
      });
    });
  });
});
