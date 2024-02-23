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

//browserstack creds
config.user = ''
config.key = ''
config.hostname = 'hub.browserstack.com'

config.capabilities = [{
    // capabilities for browserstack browser web tests
    browserName: 'chrome', // or "firefox", "microsoftedge", "safari"
    strictSSL: false,
    'bstack:options': {
        browserVersion: '120.0',
        os: 'Windows',
        osVersion: '10'
      }
}]

config.services = [
    [TimelineService],
        ['browserstack', {
            testObservability: true,
            acceptSslCerts: true,
            acceptInsecureCerts: true,
            testObservabilityOptions: {
                projectName: "wdio-cucumber-poc",
                buildName: "Smoke Test"
            },
            browserstackLocal: false
        }]
    ]

config.reporters = [
    [
        'spec', {
            addConsoleLogs: true,
        },
    ],
    [
        'allure', {
            outputDir: 'reports/bstack/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
        }
    ],
    [
        'cucumberjs-json', {
            jsonFolder: 'reports/bstack/cucumberjs-json-reports',
            language: 'en',
        },
    ],
    [
        'timeline', {
            outputDir: 'reports/bstack/timeline-reports',
            screenshotStrategy: 'on:error'
        }
    ],
    [
        'junit', {
            outputDir: 'reports/bstack/junit-reports',
        }
    ]
]

exports.config = config
