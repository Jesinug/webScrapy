const puppeteer = require('puppeteer');

const getReservationData = async () => {
	try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

		await page.goto(`https://www.book-secure.com/index.php?
			s=results&
			group=ascentral&
			property=thphu18547&
			arrival=2021-09-14&
			departure=2021-09-21&
			adults1=2&
			children1=1&
			childrenAges1=1&
			locale=es_ES&
			currency=EUR&
			stid=9l48mtulr&
			Clusternames=ascentral&
			cluster=ascentral&
			Hotelnames=Asia-Centara-Grand-Beach-Resort-Phuket&
			hname=Asia-Centara-Grand-Beach-Resort-Phuket&
			arrivalDateValue=2021-09-14&
			frommonth=9&
			fromday=14&
			fromyear=2021&
			nbdays=7&
			nbNightsValue=7&
			adulteresa=2&
			nbAdultsValue=2&
			enfantresa=1&
			nbChildrenValue=1&
			redir=BIZ-so5523q0o4&
			rt=1628103401`, { waitUntil: 'networkidle2' });
    
		const data = await page.evaluate(() => {
			const checkIn = document.querySelector('#fb-qs-summary-dates-arrival .fb-date').dataset.date;
			const checkOut = document.querySelector('#fb-qs-summary-dates-departure .fb-date').dataset.date;
			const adults = Number(document.querySelector('#fb-qs-summary-rooms-adults span').dataset.mode);
			const children = Number(document.querySelector('#fb-qs-summary-rooms-children span').dataset.mode);
			const numberOfRooms = Number(document.querySelector('#fb-qs-summary-rooms-quantity span').innerText.split(' ')[0]);
			const totalGuests = adults + children
			const currency = document.querySelector('#fb-headbar-block-currency .fb-headbar-value').innerText.match(/\(([^)]+)\)/)[1];
			const language = document.documentElement.lang;
			const numberOfNights = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24);
			

			const results = document.querySelectorAll('#results-items .fb-results-accommodation')
			const prices = [];
				
			for (let index = 0; index < results.length; index++) {
				const roomPrices = [...results[index].querySelectorAll('.new-price .fb-price')].map(elem => Number(elem.dataset.price))
				prices.push(...roomPrices)
			}

			const minimunPrice = Math.min(...prices)

			return {
				checkIn,
				checkOut,
				adults,
				children,
				numberOfRooms,
				totalGuests,
				currency,
				language,
				numberOfNights,
				minimunPrice,
			}
    });
		await browser.close();

    return data;
    } catch (e) {
     return e;
    }
}


getReservationData()
	.then(result => {
		console.log(result)
	})
	.catch((e) => {
		console.log(e)
	})


    
