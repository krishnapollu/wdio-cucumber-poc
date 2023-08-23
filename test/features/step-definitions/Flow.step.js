const loginPage = require('../../pageobjects/web/login.page');
const homePage = require('../../pageobjects/web/home.page');
const cartPage = require('../../pageobjects/web/cart.page');
const checkoutPage = require('../../pageobjects/web/checkout.page');
const productPage = require('../../pageobjects/web/product.page');
const util = require('../../utils/TestDataUtils');
require('dotenv').config();
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(`Login to Application`, async () => {
    await loginPage.open();
    await loginPage.doLogin(process.env.USER_ID, process.env.USER_PWD)
});

When(`Sorting the page`, async () => {
    await homePage.sortItems('Price (low to high)');
});

Then(`Products should get sorted`, async () => {
    await homePage.verifyLowest('$7.99');
});

Given(`Product selected`, async () => {
    await homePage.selectItem('Sauce Labs Bolt T-Shirt');
});

When(`Added to cart`, async () => {
    await productPage.addToCart();
});

Then(`Product should be visible in Cart page`, async () => {
    await productPage.goBack();
    await homePage.gotoCart();
    await cartPage.verifyItemPresent('Sauce Labs Bolt T-Shirt');
});

Then(`User should be able to remove the product from Cart`, async () => {
    await cartPage.removeFromCart('Sauce Labs Bolt T-Shirt');
    await cartPage.gotoAllItems();
});

Then(`User should be able to cancel Checkout`, async () => {

    await cartPage.checkOut();
    await checkoutPage.cancelCheckOut();
    await cartPage.removeFromCart('Sauce Labs Bolt T-Shirt');
});

Then(`User should be able to Checkout`, async () => {

    await cartPage.checkOut();
    await checkoutPage.fillCheckOutInfo('firstname', 'lastname', '12345');
    await cartPage.verifyPaymentInfo();
    await cartPage.clickFinish();
});