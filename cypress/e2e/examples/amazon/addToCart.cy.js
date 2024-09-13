import CartPage from "../../../pages/examples/cart";
import FilterPage from "../../../pages/examples/filterPage";
import HomePage from "../../../pages/examples/homePage";
import ProductDetailPage from "../../../pages/examples/productDetailPage";
import SearchResultsPage from "../../../pages/examples/searchResultsPage";

const homePage = new HomePage();
const cartPage = new CartPage();
const filterPage = new FilterPage();
const searchResultsPage = new SearchResultsPage();
const productDetailPage = new ProductDetailPage();

describe("Amazon Add to Cart Functionality", () => {
  let search = "Laptop";

  beforeEach(() => {
    homePage.visit();
  });

  it("should be able to count items in cart", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");

    productDetailPage.visitFirstDetailPage();
    // Add item to cart
    cartPage.addToCart();

    cartPage.visit();
    cartPage.getCartItemCount().should('eq', 1);
  });

  it("should be able to add item to cart and check if it's same", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");

    productDetailPage.visitFirstDetailPage();

    // Add item to cart
    cartPage.addToCart();
    
    cartPage.visit();
    cartPage.getCartItemCount().should('eq', 1);
    cartPage.getFirstCartItemTitle().should('contain', 'HP').and('contain', 'Laptop');
  });

  it("should be able to check the total price of cart", () => {
    homePage.searchFor(search);
    filterPage.applyCheckboxFilter("Brands", "HP");

    productDetailPage.visitFirstDetailPage();
    productDetailPage.getTitle().should('contain', 'HP').and('contain', 'Laptop')

    let productPrice;
    productDetailPage.getPrice().then((priceText) => {
        productPrice = parseFloat(priceText.replace(/[₹,]/g, ""));
    }); 

    // Add item to cart
    cartPage.addToCart();
    
    cartPage.visit();
    cartPage.getCartItemCount().should('eq', 1);
    cartPage.getFirstCartItemTitle().should('contain', 'HP').and('contain', 'Laptop');
    cartPage.getCartSubTotal().then((total) => {
        const cartSubTotal = parseFloat(total.replace(/[₹,]/g, ""));
        cy.wrap(cartSubTotal).should('eq', productPrice);
    })
  });

  it("should be able to search, filter, add to cart, with multiple items - (Data driven test) - (VDP)", () => {
    cy.fixture("examples/addToCart").then((filter) => {
      filter.forEach((data) => {
        cy.log(`********** ${data.name} **********`);

        data.items.forEach((item) => {
            homePage.searchFor(item.search);
            item.filters.forEach((fil) => {
                filterPage.applyFilter(fil.type, fil.title, fil.value);
            });
            searchResultsPage.getFirstResult().should("be.visible");
            productDetailPage.visitFirstDetailPage();
            cy.wait(200)
            
            // Add item to cart
            cartPage.addToCart();
        })

        cartPage.visit();
        cartPage.getCartItemCount().should('eq', data.expected);
      });
    });
  });
});
