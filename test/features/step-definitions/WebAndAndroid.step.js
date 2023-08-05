const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/web/login.page');
const HomePage = require('../../pageobjects/web/home.page');
const LoginPageApp = require('../../pageobjects/mobile/Login.page');

Given(/^Verify Multiremote App Launch$/, async () => {
    
    await LoginPage.open();
   
});

When(/^Chrome is also launched alongside$/, async () => {
	
    await LoginPageApp.login();
});
