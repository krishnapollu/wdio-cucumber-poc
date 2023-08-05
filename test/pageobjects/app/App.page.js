const Page = require('../page');
const Locators = require('../../resources/locators/app-locators');
const PageUtils = require('../../utils/PageUtils');

class App extends Page {

    async login() {
        await expect(androidClient.$(Locators.loginpage.logo)).toBeDisplayed()
        console.log('Login done...');
    }
} module.exports = new Login();