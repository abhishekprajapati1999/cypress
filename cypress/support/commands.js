/// <reference types="cypress" />

import Login from "../pages/login";
import Logout from "../pages/logout";

// Custom command for login
Cypress.Commands.add('login', (username, password) => {
    const loginObj = new Login();
    loginObj.setUsername(username);
    loginObj.setPassword(password);
    loginObj.clickLogin();
})

// Custom command for logout
Cypress.Commands.add('logout', () => {
    const logoutObj = new Logout();
    logoutObj.clickLogout();
})