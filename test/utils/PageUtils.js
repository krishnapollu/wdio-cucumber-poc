/**
 * Class that handles wrappers for Page/Browser handling
 * @date 7/31/2023
 * @author Krishna S.
 *
 * @class PageUtils
 * @typedef {PageUtils}
 */
class PageUtils {

    async waitUntilDisplayed(elem, shouldFail){
        try{
            await webClient.$(elem).waitForDisplayed({timeout: 5000, timeoutMsg: 'Element not displayed'
        , interval: 500});
        }catch(e){
            if(shouldFail){
                expect(0 == 1);
            }
            return false;
        }return true;
    }

    async waitUntilNumberOfWindowsToBe(count){
        await webClient.waitUntil( async function () {
            var w = await webClient.getWindowHandles();
            return w.length === count;
        }, {timeout: 15000, timeoutMsg: 'No. of windows != '+count });
    }

    async isWindowsPresent(count){
        var w = await webClient.getWindowHandles();
       return w.length == count;
    }
}

module.exports = new PageUtils();