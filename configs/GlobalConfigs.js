const path = require('path');
var testDataFileXLSX;
var testDataFileJSON;
var dynamicDataFileJSON;
var postRunFileXLSX;
var credFile;

/**
 * Class to handle global configs 
 * @date 7/31/2023
 * @author Krishna S.
 *
 * @class GlobalConfigs
 * @typedef {GlobalConfigs}
 */
class GlobalConfigs {

    /**
     * Creates an instance of GlobalConfigs.
     * Sets default values to variables
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @constructor
     */
    constructor() {
        testDataFileXLSX = path.join(process.cwd(), './test/resources/data/test-data.xlsx');
        testDataFileJSON = path.join(process.cwd(), './test/resources/data/test-data.json');
        dynamicDataFileJSON = path.join(process.cwd(), './test/resources/data/data-created.json');
        postRunFileXLSX = path.join(process.cwd(), './test/resources/data/post-run.xlsx');
        credFile = path.join(process.cwd(), './test/resources/data/creds.json');
    }

    /**
     * sets the global variables with respective values
     * @date 7/31/2023
     * @author Krishna S.
     */
    setGlobals() {

        console.debug('In setGlobals Function...');
        console.debug('Setting globals values...');

        global.appUrl = 'https://google.com';
       
        global.testDataFileXLSX = testDataFileXLSX;
        global.testDataFileJSON = testDataFileJSON;
        global.dynamicDataFileJSON = dynamicDataFileJSON;
        global.postRunFileXLSX = postRunFileXLSX;
    }

    /**
     * Sets the values for global.testData
     * @date 7/31/2023
     * @author Krishna S.
     */
    setGlobalTestData() {

        console.debug('In setGlobalTestData Function...');
        console.debug('Setting test data...');
        global.testData = require(global.testDataFileJSON);
    }

    /**
     * Extracts test data from excel file (testDataFileXLSX) and stores them in a JSON file (testDataFileJSON)
     * @date 7/31/2023
     * @author Krishna S.
     */
    extractExcelData() {
        const util = require(path.join(process.cwd(), './test/utils/TestDataUtils'));
        console.debug('Extracting Excel Test Data...')
        util.extractTestData(testDataFileXLSX, testDataFileJSON);
    }


    /**
     * Teardown tasks to be done on Suite Completion
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} isExcelWriteRequired
     */
    tearDown(isExcelWriteRequired) {

        global.testData = require(testDataFileJSON);
        console.log('-----------Test data-------------- ');
        // console.log(global.testData);
        const util = require(path.join(process.cwd(), './test/utils/TestDataUtils'));
        util.writeGlobalDataToJson(testDataFileJSON);
        if (isExcelWriteRequired) {
            console.log('Writing back to Excel...')
            util.writeJsonDataToNewExcel(postRunFileXLSX, testDataFileJSON);
        }

    }

} module.exports = new GlobalConfigs();