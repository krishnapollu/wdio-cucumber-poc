const fs = require('fs')
const XLSX = require('xlsx')

/**
 * Class to handle test data
 * @date 7/31/2023
 * @author Krishna S.
 *
 * @class TestDataUtils
 * @typedef {TestDataUtils}
 */
class TestDataUtils {

    /**
     * write global.testdata contents to mentioned json file
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} outputFile
     */
    writeGlobalDataToJson(outputFile) {

        console.log('Writing global data to json...')
        fs.writeFileSync(outputFile, JSON.stringify(global.testData, null, 4), err => {
            if (err)
                console.log('Error' + err);
        })
    }

    /**
     * write jsonData contents to output file
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} outputFile
     * @param {*} jsonData
     */
    storeDataToJson(outputFile, jsonData) {

        fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 4), err => {
            if (err)
                console.log('Error' + err);
        })
    }

    /**
     * Stores passed key-value to JSON / Excel file
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} sheet
     * @param {*} row
     * @param {*} column
     * @param {*} value
     */
    storeDataToFile(sheet, row, column, value){
        // this.updateExcelCellValue(global.testDataFileXLSX, sheet, row, column, value);
        this.storeKeyValueToJson(global.testDataFileJSON, sheet, row, column, value);
    }

    /**
     * Method to store passed key-value to a JSON file
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} file
     * @param {*} sheet
     * @param {*} scenario
     * @param {*} key
     * @param {*} value
     */
    storeKeyValueToJson(file, sheet, scenario, key, value) {

        let jsonData = JSON.parse(fs.readFileSync(file));
        jsonData[sheet][scenario][key] = value;
        fs.writeFileSync(file, JSON.stringify(jsonData, null, 4), err => {
            if (err)
                console.log('Error' + err);
        })
    }

    /**
     * extracts test data from excel and stores in 
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} xlFile
     * @param {*} jsonFile
     */
    extractTestData(xlFile, jsonFile) {

        console.log('Reading excel....')
        const workbook = XLSX.readFile(xlFile);
        let excelData = {};
        for (const sheetname of workbook.SheetNames) {
            console.log('Reading contents of sheet ' + sheetname);
            let sheetData = {};
            let tempJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);
            let len = Object.keys(tempJson).length;
            for (let i = 0; i < len; i++) {
                sheetData[tempJson[i].Scenario] = tempJson[i]; //expects Scenario column with a key
            }
            excelData[sheetname] = sheetData;
        }
        this.storeDataToJson(jsonFile, excelData);
    }

    /**
     * writes contents of global.testData to Excel File
     * @date 7/31/2023
     * @author Krishna S.
     */
    writeGlobalDataToExcel() {
        const workbook = XLSX.readFile(global.testDataFileXLSX, { cellStyles: true });
        const testData = global.testData;
        for (const sheet of Object.keys(testData)) {
            let tempJson = testData[sheet];
            let sheetData = [];
            for (const key of Object.keys(tempJson)) {
                sheetData.push(tempJson[key]);
            }
            // console.log('Sheet Data: '+sheet);
            // console.log(sheetData);
            workbook.Sheets[sheet] = XLSX.utils.json_to_sheet(sheetData);
        }
        XLSX.writeFile(workbook, global.testDataFileXLSX, { cellStyles: true });
    }

    /**
     * Store the inputJsonFile contents into a new excel file ( <outputfile>.xlsx )
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} outputFile
     * @param {*} inputJsonFile
     */
    writeJsonDataToNewExcel(outputFile, inputJsonFile) {
        const workbook = XLSX.utils.book_new();
        const testData = JSON.parse(fs.readFileSync(inputJsonFile));
        for (const sheet of Object.keys(testData)) {
            let tempJson = testData[sheet];
            console.log(tempJson);
            let sheetData = [];
            for (const key of Object.keys(tempJson)) {
                sheetData.push(tempJson[key]);
            }
            // console.log('Sheet Data: '+sheet);
            // console.log(sheetData);
            const ws = XLSX.utils.json_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(workbook, ws, sheet);
        }
        XLSX.writeFile(workbook, outputFile);
    }

    /**
     * Stores passed key-value into excel data file
     * @date 7/31/2023
     * @author Krishna S.
     *
     * @param {*} file
     * @param {*} sheet
     * @param {*} row
     * @param {*} column
     * @param {*} value
     */
    updateExcelCellValue(file, sheet, row, column, value) {
        const workbook = XLSX.readFile(file, { cellStyles: true });
        console.log('Reading excel....')
        let tempJson = [];
        console.log('Reading contents of sheet ' + sheet);
        tempJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let len = Object.keys(tempJson).length;
        for (let i = 0; i < len; i++) {
            if (tempJson[i].Scenario == row) {
                tempJson[i][column] = value;
            }
        }
        workbook.Sheets[sheet] = XLSX.utils.json_to_sheet(tempJson);
        XLSX.writeFile(workbook, file, { cellStyles: true });
    }

} module.exports = new TestDataUtils();