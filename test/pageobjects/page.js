/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
   
    constructor(){
        if(global.webClient == null){
        global.webClient = browser;
        }
    }
    async open () {
        
        return webClient.url(global.appUrl);
    }

}
