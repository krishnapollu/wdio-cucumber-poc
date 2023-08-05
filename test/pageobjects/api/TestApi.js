const request = require('supertest');
const assert = require('assert');
const report = require('@wdio/allure-reporter')

module.exports = {

    async callGetTest() {
        console.log('Sending GET /test request...');
        const response = await request('http://localhost:5000').get('/test');
        expect(response.status).toEqual(200);
        expect(response.body.msg).toEqual('ok');
        const reqData = JSON.parse(JSON.stringify(response)).req;
        let json = {
            "method": JSON.stringify(reqData.method),
            "url": JSON.stringify(reqData.url),
            "request-data": JSON.stringify(reqData.data),
            "request-headers": JSON.stringify(reqData.headers),
            "reponse-status": JSON.stringify(response.status),
            "reponse-body": JSON.stringify(response.body)
        };
        report.addStep('STEP: API GET /test', { content: JSON.stringify(json), name: 'data', type: 'application/json' });


    }
}