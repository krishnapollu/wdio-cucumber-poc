const WebPage = require('../pageobjects/classic/Web.page')
const util = require('../utils/TestDataUtils');
var testdata1 = require('../resources/data/test-data.json');

const sm = require('./Something');


describe('Datadriven PoC', () => {
    let flows = [];
    before(async function () {
        await LoginPage.open()
    });
    
    context('Flows (Sheet1)', () => {
        Object.keys(testdata1.data).forEach((flow) => {
            it('Invoke '+flow, async () => {
                let val = await sm.doSomething(global.testData.data[flow]);
                util.storeDataToFile('data', flow, 'value', val);
            });
        });
    });
});