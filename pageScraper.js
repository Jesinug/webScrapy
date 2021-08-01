const scraperObject = {
    url: 'https://reservations.travelclick.com/110426?datein=11/16/2020&dateout=11/17/2020&identifier=&_ga=2.57257386.1267432369.1605552753-2004099546.1603909283#/accommodation/room',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        // Wait for the required DOM to be rendered
        await page.waitForSelector('.page_inner');
        // Get the link to all the required books
        let urls = await page.$$eval('section ol > li', links => {
        // Make sure the book to be scraped is in stock
        links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
        // Extract the links from the data
        links = links.map(el => el.querySelector('h3 > a').href)
        return links;
        });

    }
}

module.exports = scraperObject;