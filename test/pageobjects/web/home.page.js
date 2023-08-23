const Page = require("../page");
const Locators = require('../../resources/locators/locators.js')
const reporter = require('@wdio/allure-reporter')

class Home extends Page {

    async selectItem(str) {
        console.log('Selecting item ' + str);
        await webClient.$('//div[@class="inventory_item_name" and contains(.,"' + str + '")]').click();
    }

    async sortItems(order) {
        console.log('Sorting items by order: ' + order);
        await webClient.$(Locators.homePage.list_sort).selectByVisibleText(order);
    }

    async gotoCart() {
        console.log('Navigating to cart...');
        await webClient.$(Locators.homePage.lnk_cart).click();
    }

    async logout() {
        console.log('Logging out...');
        await webClient.$(Locators.homePage.lnk_menu).click();
        await webClient.$(Locators.homePage.lnk_logout).click();
    }

    async verifyLowest(amount) {
        console.log('Verifying lowest...');
        await expect(webClient.$('(//div[@class="inventory_item_price"])[1]')).toHaveText(amount);
        reporter.addStep('STEP: Lowest Amount verification');
        await webClient.takeScreenshot();
    }
}

module.exports = new Home();