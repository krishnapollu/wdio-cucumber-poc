# **wdio-cucumber-poc**  
  
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
`` git clone ``  

## Install the project
- `` npm install ``  

## Run cucumber features :  

#### Web UI tests in local browser (config file: `wdio-local.conf.js`)
- `` npm run test ``  

#### Web UI tests in saucelabs browser (config file: `wdio-sauce.conf.js`)
- `` npm run sauce-test ``  

#### Web + Mobile app tests in local browser and emulator (config file: `wdio-multiremote-local.conf.js`)
- `` npm run multiremote ``  

#### Web + Mobile app tests in SauceLabs (config file: `wdio-multiremote-sauce.conf.js`)
- `` npm run sauce-multiremote ``  

## Run data driven tests with mocha (config file: `wdio-mocha.conf.js`)
- `` npm run mocha ``

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
    
