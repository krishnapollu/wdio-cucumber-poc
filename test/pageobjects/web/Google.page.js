const Page = require('../page');
const Locators = require('../../resources/locators/locators.js')
const PageUtils = require('../../utils/PageUtils.js')
const report = require('@wdio/allure-reporter')

class Google extends Page {

    async doSearch(str){

        await webClient.$(Locators.googleSearch.search_txtarea).type(str);
        await webClient.$(Locators.googleSearch.search_submit).click();
    }

    async verifySearchSuccess(str){
        await expect(webClient.$("//div[@id='rcnt']")).toBeDisplayed();
        report.addStep('STEP: Search results shown');
        await webClient.takeScreenshot();
    }
}
module.exports = new  Google();