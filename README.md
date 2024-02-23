# **wdio-cucumber-poc**  
  [![tested with webdriver.io](https://img.shields.io/badge/tested%20with-webdriver.io-%23ea5906)](https://webdriver.io/)
## Project Structure

```
└── wdio-cucumber-poc/
    ├── configs/
    ├── test/
    │   ├── features/
    │   │   ├── feature-files/
    │   │   │   ├── web/
    │   │   │   └── web-mpbile/
    │   │   └── stepdefinitions/
    │   ├── pageobjects/
    │   │   ├── app/
    │   │   ├── web/
    │   │   └── page.js
    │   ├── resources/
    │   │   ├── data/
    │   │   ├── locators/
    │   ├── specs/
    │   └── utils/
    └── package.json
```
## Clone the repo into the project folder
- `` git clone https://github.com/krishnapollu/wdio-cucumber-poc.git ``  

## Install the project
- `` npm install ``  

## Run cucumber features :  

Web UI tests in local browser (config file: `wdio-local.conf.js`)
- `` npm run test ``  
Web UI tests in saucelabs browser (config file: `wdio-sauce.conf.js`)
- `` npm run sauce-test ``  
 Web + Mobile app tests in local browser and emulator (config file: `wdio-multiremote-local.conf.js`)
- `` npm run multiremote ``  
Web + Mobile app tests in SauceLabs (config file: `wdio-multiremote-sauce.conf.js`)
- `` npm run sauce-multiremote ``  
Run data driven tests with mocha (config file: `wdio-mocha.conf.js`)
- `` npm run mocha ``

## Configs
All the common configurations are placed in `` configs/wdio.shared.conf.js ``
### Shared configs
#### 1. Parallelism
`` maxInstances: 10, ``
#### 2. Test framework to be used
`` framework: 'cucumber', // can be cucumber or mocha or jasmine ``
#### 3. CucumberOpts
```js
cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./test/features/step-definitions/*.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: true,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },
```
#### 4. Hooks
Only required hooks need to be implemented
```js
 onPrepare: function (config, capabilities) {
        setup.extractExcelData();
    },
before: function (capabilities, specs) {
        setup.setGlobals();
        setup.setGlobalTestData(); //argument: XLSX or JSON
    },
onComplete: function(exitCode, config, capabilities, results) {
        setup.tearDown(true);
    },
```
#### 5. Reporters
Multiple reporters of your choie can be intergrated to the suite by just adding the name (and some configs like report directory path which is optional) of the reporter
```js
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
```
For making Allure reports more informative, additional steps / attachments are added in the pageobjects / step definitions / specs files as below:
```js
const report = require('@wdio/allure-reporter')
...
...
report.addStep('STEP: Search results shown');
await webClient.takeScreenshot();
```
### Specific Configs
Separate config.js need to be maintained for this which will import the common configurations from the `` configs/wdio.shared.conf.js ``

#### a. Web Only Tests - to run in local browsers
```js
config.capabilities = [{
  browserName: 'chrome'
}]
config.services = [
    'chromedriver',
    [TimelineService],
]
```
#### b. Mobile Only Tests - to run in local emulators
```js
config.capabilities = {
          platformName: 'Android',
          "appium:deviceName": 'emulator-5554',
          'appium:app': path.join(process.cwd(), './app.apk'),
          "appium:platformVersion": '7.1.1',
          "appium:automationName": 'UIAutomator2',
          "appium:autoGrantPermissions": true,
          "appium:idleTimeout": 100000
      }
config.services = [
  'appium', {
      args: {
          address: 'localhost',
          port: 4723,
          relaxedSecurity: true,
          "base-path": '/wd/hub'
      },
      command: 'appium',
      logPath: './'
  }
]
```
#### c. Web Only Tests - SauceLabs
```js
  config.capabilities = [{
      browserName: 'chrome',
      'sauce:options': {
          platformName: 'Windows 10',
          browserVersion: 'latest',
          screenResolution: '1600x1200',
          build: 'test-wdio'
      }
  }]
  
  config.services = [
      ['sauce'],
      ...
  ]
```
#### d. Mobile Only Tests - SauceLabs
```js
//sauce labs details
config.user = ''
config.key = ''
config.region = '' // 'us' or 'eu' or 'apac'

config.capabilities = {
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
config.services = [
    'sauce',
    ...
]
```
#### e. Web + Mobile Tests - Local Browser and Emulator(s)
These are called Multiremote tests where multiple browser / driver instances are used in a single spec / worker; which can be multiple browsers or multiple devices (or emulators) or a combination of both. Here we are looking into a browser + emulator combo.
```js
config.capabilities = {
    webClient: {
        capabilities: {
            browserName: 'chrome'
        }
    },
    androidClient: {
        capabilities: {
            platformName: 'Android',
            "appium:deviceName": 'emulator-5554',
            'appium:app': path.join(process.cwd(), './app.apk'),
            "appium:platformVersion": '7.1.1',
            "appium:automationName": 'UIAutomator2',
            "appium:autoGrantPermissions": true,
            "appium:idleTimeout": 100000
        }
    }
}
config.services = [
    ['chromedriver', {

        hostname: 'localhost',
        port: 9515

    }],
    ['appium', {
        args: {
            address: 'localhost',
            port: 4723,
            relaxedSecurity: true,
            "base-path": '/wd/hub'
        },
        command: 'appium',
        logPath: './'
    }],
    ...
]
```
#### f. Web + Mobile Tests - SauceLabs Browser and Emulator(s)
```js
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
]
```

#### g. Web only tests - Browserstack
```js
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
            ...
        ]

```
## Data Driven Tests with Mocha
I was able to maintain my e2e suite (in cucumber) as well as data driven suite (in mocha) alongside in the same project there by reusing all my page objects as such. Lets see how the config and test specs for the data driven tests look like.

#### Mocha Config
```js
// configs/wdio-mocha.conf.js

config.framework = 'mocha'
config.mochaOpts = {
    ui: 'bdd',
    timeout: 60000
}
```

#### Test Spec File
```js
 context('Flows (Sheet1)', () => {
        Object.keys(testdata1.data).forEach((flow) => { //runs the test for each key present in testdata1.data
            it('Invoke '+flow, async () => {
                await sm.doSomething(global.testData.data[flow]);
                util.storeDataToFile('data', flow, 'status', 'PASS');
            });
        });
    });
```

## Reports
- Multiple report types generated per run type - Allure, Junit, Cucumber-JSON, Timeline
- Reports will be generated in below path(s):
 ```
└── wdio-cucumber-poc/
    └── reports/
        ├── local/
        │   ├── allure-results
        │   ├── cucumberjs-json-reports
        │   ├── junit-reports
        │   └── timeline-reports
        ├── sauce/
        ├── multiremote-local/
        └── multiremote-sauce/ 
```
- Sample report [here](https://krishnapollu.github.io/wdio-cucumber-poc/)
    
