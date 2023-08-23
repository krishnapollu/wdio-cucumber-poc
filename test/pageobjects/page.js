/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
require('dotenv').config();

module.exports = class Page {
   
    constructor(){
        if(global.webClient == null){
        global.webClient = browser;
        }
    }
    async open () {
        
        await webClient.url(process.env.APP_URL);
        await webClient.maximizeWindow();
    }

}
