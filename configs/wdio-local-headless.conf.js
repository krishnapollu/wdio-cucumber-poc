/**
 * wdio configs for running headless in local env
 * Test Framework : Cucumber
 * Capability: Web Tests Only
 * @author Krishna S.
 */
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const setup = require('./GlobalConfigs');
const { config } = require('./wdio.shared.conf');

config.specs = [
    '../test/**/web/*.feature'
]

config.capabilities = [{
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: ['headless=new', 'disable-gpu']
    },
}]
config.services = [
    'chromedriver',
    [TimelineService],
]
config.reporters = [
    [
        'spec', {
            addConsoleLogs: true,
        },
    ],
    [
        'allure', {
            outputDir: 'reports/local/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
        }
    ],
    [
        'cucumberjs-json', {
            jsonFolder: 'reports/local/cucumberjs-json-reports',
            language: 'en',
        },
    ],
    [
        'timeline', {
            outputDir: 'reports/local/timeline-reports',
            screenshotStrategy: 'on:error'
        }
    ],
    [
        'junit', {
            outputDir: 'reports/local/junit-reports',
        }
    ]
]

exports.config = config