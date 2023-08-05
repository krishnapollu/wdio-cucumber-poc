const pg = require('../pageobjects/web/Google.page')
const util = require('../utils/TestDataUtils');
var testdata1 = require('../resources/data/test-data.json');

const sm = require('./Something');


describe('Datadriven PoC', () => {
    let flows = [];
    before(async function () {
        await pg.open()
    });
    
    context('Flows (Sheet1)', () => {
        Object.keys(testdata1.data).forEach((flow) => {
            it('Invoke '+flow, async () => {
                await sm.doSomething(global.testData.data[flow]);
                util.storeDataToFile('data', flow, 'status', 'PASS');
            });
        });
    });
});