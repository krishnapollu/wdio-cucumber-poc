const Locators = require("../../resources/locators/locators");
const Page = require("../page");
const reporter = require('@wdio/allure-reporter');

class Product extends Page{

    async addToCart(){
        console.log('Adding item to cart...');
        await webClient.$(Locators.productPage.btn_addToCart).click();
        reporter.addStep('STEP: Item added to cart');
        await webClient.takeScreenshot();
    }

    async goBack(){
        console.log('Navigating back...')
        await webClient.$(Locators.productPage.btn_back).click();
    }
};
module.exports = new Product();  