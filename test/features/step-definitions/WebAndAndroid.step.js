const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPageApp = require('../../pageobjects/app/App.page');
const pg = require('../../pageobjects/web/Google.page')

Given(/^Verify Multiremote App Launch$/, async () => {
    
    await pg.open();
   
});

When(/^Chrome is also launched alongside$/, async () => {
	
    await LoginPageApp.login();
});
