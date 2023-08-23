const Locators = require("../../resources/locators/locators");
const Page = require("../page");
const reporter = require('@wdio/allure-reporter');


class Cart extends Page {

    async removeFromCart(str) {
        console.log('Removing item from cart...');
        await webClient.$('//div[contains(.,"' + str + '")]/../following-sibling::div[@class="item_pricebar"]/button').click();
        reporter.addStep('STEP: Removed item from Cart');
        await webClient.takeScreenshot();
    }

    async verifyItemPresent(str) {
        console.log('Verifying if item present in Cart...');
        await expect(webClient.$('//div[@class="cart_item_label" and contains(.,"' + str + '")]')).toBeDisplayed();
        reporter.addStep('STEP: Item present in Cart');
        await webClient.takeScreenshot();
    }

    async continueShopping() {
        console.log('Clicking on Continue Shipping...');
        await webClient.$(Locators.cartPage.btn_continueShpg).click();
    }

    async checkOut() {
        console.log('Checking out...');
        await webClient.$(Locators.cartPage.lnk_chkout).click();
    }

    async verifyPaymentInfo() {
        console.log('Verifying if payment information is visible...');
        await expect(webClient.$(Locators.cartPage.info_summary)).toBeDisplayed();
        reporter.addStep('STEP: Payment Info verification');
        await webClient.takeScreenshot();
    }

    async clickFinish() {
        console.log('Clicking Finish to complete Checkout...');
        await webClient.$(Locators.cartPage.lnk_finish).click();
        await expect(webClient.$(Locators.cartPage.img_chkoutComplete)).toBeDisplayed();
        reporter.addStep('STEP: Checkout Completion Verification');
        await webClient.takeScreenshot();
    }

    async gotoAllItems() {
        console.log('Navigating to Product Page...');
        await webClient.$(Locators.homePage.lnk_menu).click();
        await webClient.$(Locators.homePage.lnk_inventory).click();

    }
};
module.exports = new Cart();