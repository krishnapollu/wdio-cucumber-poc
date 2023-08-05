/**
 * wdio configs for running in local env
 * Test Framework : Mocha
 * Capability: Web (and/or) Android Tests
 * @author Krishna S.
 */

const setup = require('./GlobalConfigs');
const path = require('path');
const { config } = require('./wdio.shared.conf');

config.specs = [
    '../test/specs/**/*.spec.js'
]

config.capabilities = {
    webClient: {
        capabilities: {
            browserName: 'chrome'
        }
    },
    androidClient: {
        capabilities: {
            browserName: 'chrome'
        }
    }
}

config.framework = 'mocha'

config.services = ['chromedriver']

config.reporters = [
    'spec',
    ['allure', {
        outputDir: 'reports/mocha/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }
    ],
    ['junit', {
        outputDir: 'reports/mocha/junit-reports'
    }]
]

config.mochaOpts = {
    ui: 'bdd',
    timeout: 60000
}

exports.config = config