const Page = require("../page");
const reporter = require('@wdio/allure-reporter');
const Locators = require("../../resources/locators/locators");

class Checkout extends Page {

    async fillCheckOutInfo(fname, lname, zip){

        console.log('Filling checkout Info...');
        await webClient.$(Locators.checkoutPage.txt_fname).setValue(fname);
        await webClient.$(Locators.checkoutPage.txt_lname).setValue(lname);
        await webClient.$(Locators.checkoutPage.txt_zip).setValue(zip);
        await webClient.$(Locators.checkoutPage.btn_continue).click();
        reporter.addStep('STEP: Checkout Info filled in');
    }

    async cancelCheckOut(){
        console.log('Cancelling checkout...');
        await webClient.$(Locators.checkoutPage.btn_cancel).click();
        reporter.addStep('STEP: Cancelled Checkout');
    }
};
module.exports = new Checkout();