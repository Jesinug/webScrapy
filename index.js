const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('https://reservations.travelclick.com/110426?datein=11/16/2020&dateout=11/17/2020&identifier=&_ga=2.57257386.1267432369.1605552753-2004099546.1603909283#/accommodation/room', {waitUntil: 'networkidle2'});
    await page.click('#promoInfo .btn-promo');
    await page.screenshot({path: 'screenshot1.jpg'})

})();



    /**try {
        
        console.log("Opening the browser......");


        
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }

    return browser;
}

module.exports = {
    startBrowser
};*/