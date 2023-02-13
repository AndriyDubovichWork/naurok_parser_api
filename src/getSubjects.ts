const puppeteer = require('puppeteer');

const getSubjects = async () => {
	const options = {
		args: [
			'--disable-gpu',
			'--disable-dev-shm-usage',
			'--disable-setuid-sandbox',
			'--no-first-run',
			'--no-sandbox',
			'--no-zygote',
		],
		headless: true,
		ignoreHTTPSErrors: true,
	};
	const browser = await puppeteer.launch();
	const page = await browser.newPage(options);
	await page.setDefaultNavigationTimeout(0);
	await page.goto(
		'https://naurok.com.ua/site/search-resources?q=%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B0%D1%86%D1%96%D1%8F&type%5B%5D=test&grade%5B%5D=11&subject%5B%5D=3'
	);

	const Subjects = await page.evaluate(() => {
		let AllLabelsTags = Array.from(document.querySelectorAll('.content-block .checkbox div label'));

		const SubjectCheckBoxes = Array.from(document.querySelectorAll('input.subject-checkbox'));

		return SubjectCheckBoxes.map((CheckBoxID, id) => {
			const matchingCheckBoxID = id + 13;
			if (AllLabelsTags[matchingCheckBoxID]) {
				return {
					subject: AllLabelsTags[matchingCheckBoxID].textContent.slice(1),
					id: CheckBoxID.getAttribute('value'),
				};
			}
		});
	});

	return Subjects;
};

export default getSubjects;
