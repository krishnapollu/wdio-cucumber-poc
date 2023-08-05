const LoginPage = require('../pageobjects/classic/login.page')
const HomePage = require('../pageobjects/classic/home.page')
const CAP018 = require('../pageobjects/classic/CAP018.page')
const ADM009 = require('../pageobjects/classic/ADM009.page')
const { doSomething } = require('../pageobjects/classic/Web.page')
module.exports = {
    async doSomething(data) {

        console.log('data here is: ');
        console.log(data);
        return Math.floor(Math.random() * 100);
    }
}