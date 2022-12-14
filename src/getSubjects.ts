const puppeteer = require('puppeteer');

const getSubjects = async () => {
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
		args: ['--no-sandbox', '--headless'],
	});
	const page = await browser.newPage();

	await page.goto(
		'https://naurok.com.ua/site/search-resources?q=%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B0%D1%86%D1%96%D1%8F&type%5B%5D=test&grade%5B%5D=11&subject%5B%5D=3'
	);

	const Subjects = await page.evaluate(() => {
		const AllCheckBoxesTags = Array.from(document.querySelectorAll('.subject-checkbox'));

		return AllCheckBoxesTags.map((subject) => {
			return subject.textContent;
		});
	});

	console.log(Subjects);

	return Subjects;
};

export default getSubjects;
