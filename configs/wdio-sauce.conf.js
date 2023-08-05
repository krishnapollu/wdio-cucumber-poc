/**
 * wdio configs for running in saucelabs env
 * Test Framework : Cucumber
 * Capability: Web Tests Only
 * @author Krishna S.
 */

const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const { config } = require('./wdio.shared.conf');


config.specs = [
    '../test/**/web/*.feature'
]

//sauce labs details
config.user = ''
config.key = ''
config.region = '' // 'us' or 'eu' or 'apac'

config.capabilities = [{
    // capabilities for local browser web tests
    browserName: 'chrome', // or "firefox", "microsoftedge", "safari"
    'sauce:options': {
        platformName: 'Windows 10',
        browserVersion: 'latest',
        screenResolution: '1600x1200',
        build: 'test-wdio'
    }
}]

config.services = [
    [TimelineService],
    ['sauce'],
]

config.reporters = [
    [
        'spec', {
            addConsoleLogs: true,
        },
    ],
    [
        'allure', {
            outputDir: 'reports/sauce/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
        }
    ],
    [
        'cucumberjs-json', {
            jsonFolder: 'reports/sauce/cucumberjs-json-reports',
            language: 'en',
        },
    ],
    [
        'timeline', {
            outputDir: 'reports/sauce/timeline-reports',
            screenshotStrategy: 'on:error'
        }
    ],
    [
        'junit', {
            outputDir: 'reports/sauce/junit-reports',
        }
    ]
]

exports.config = config
