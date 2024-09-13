import HomePage from '../../../../pages/examples/homePage';
import SearchResultsPage from '../../../../pages/examples/searchResultsPage';

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();

describe('Amazon Search Functionality', () => {
    beforeEach(() => {
        homePage.visit(); // Visit the Amazon homepage before each test
    });

    it('should be able to verify the search text', () => {
        homePage.searchFor('Laptop');
        cy.wait(100)
        searchResultsPage.getSearchTxt().should('have.text', '"Laptop"');
    });

    it('should get the title of the first result and check if it contains Laptop', () => {
        homePage.searchFor('Laptop');
        searchResultsPage.getFirstResult().should('be.visible');
        searchResultsPage.getFirstResultTitle().contains('Laptop');
    });

    it('should be able to get the result count', () => {
        homePage.searchFor('Laptop');
        searchResultsPage.getFirstResult().should('be.visible');
        searchResultsPage.getResultCounts().should('gt', 10);
    });
});