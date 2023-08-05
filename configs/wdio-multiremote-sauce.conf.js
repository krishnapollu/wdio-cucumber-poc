/**
 * wdio configs for running in saucelabs env
 * Test Framework : Cucumber
 * Capability: Web + Android Tests
 * @author Krishna S.
 */

const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const path = require('path');
const { config } = require('./wdio.shared.conf');


config.specs = [
    '../test/**/web-hht/WebAndAndroid.feature'
]

//sauce labs details
config.user = ''
config.key = ''
config.region = '' // 'us' or 'eu' or 'apac'

config.capabilities = {
    //multiremote
    webClient: {
        capabilities: {
            browserName: 'chrome',
            'sauce:options': {
                platformName: 'Windows 10',
                browserVersion: 'latest',
                screenResolution: '1600x1200',
                build: 'test-wdio'
            }
        }
    },
    //local-appium
    androidClient: {
        capabilities: {
            platformName: 'Android', // or "firefox", "microsoftedge", "safari"
            "appium:deviceName": 'Android GoogleAPI Emulator',
            "appium:app": 'storage:filename=app.apk',
            "appium:platformVersion": '8.1',
            "appium:automationName": 'UIAutomator2',
            'sauce:options': {
                build: 'test-wdio',
                host: 'https://ondemand.us-west-1.saucelabs.com,',
                port: 443,
                path: '/wd/hub',
                idleTimeout: 1000,
                newCommandTimeout: 30 * 60000,
                waitforTimeout: 30 * 60000,
            }
        }
    }
}

config.services = [
    'sauce',
    [TimelineService]
]


config.reporters = [
    [
        'spec', {
            addConsoleLogs: true,
        },
    ],
    [
        'allure', {
            outputDir: 'reports/multiremote-sauce/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: true,
        }
    ],
    [
        'cucumberjs-json', {
            jsonFolder: 'reports/multiremote-sauce/cucumberjs-json-reports',
            language: 'en',
        },
    ],
    [
        'timeline', {
            outputDir: 'reports/multiremote-sauce/timeline-reports',
            screenshotStrategy: 'on:error'
        }
    ],
    [
        'junit', {
            outputDir: 'reports/multiremote-sauce/junit-reports',
        }
    ]
]

exports.config = config
