const { Given, When, Then } = require('@wdio/cucumber-framework');
const util = require('../../utils/TestDataUtils');
const pg = require('../../pageobjects/web/Google.page')
//data
const data = global.testData.data.Flow01;
function storeData(key, value){
    data[key] =  value;
    global.testData.Flow01 = data;
    util.storeDataToFile('data', 'Flow01', key, value);
}

Given(`Launch Google.com`, async () => {
    await pg.open();
});

When(`Search keyword`, async () => {
    await pg.doSearch(data.keyword)
});

Then(`Search results should be displayed`, async () => {
    await pg.verifySearchSuccess(data.keyword);
    storeData('status', 'PASS');
});