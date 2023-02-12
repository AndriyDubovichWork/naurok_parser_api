let chrome: any = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
	chrome = require('chrome-aws-lambda');
	puppeteer = require('puppeteer-core');
} else {
	puppeteer = require('puppeteer');
}

const getSubjects = async () => {
	let options: any = {};

	if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
		options = {
			args: [...chrome.args, '--no-sandbox', '--headless'],
			defaultViewport: chrome.defaultViewport,
			executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		};
	}
	const browser = await puppeteer.launch();
	const page = await browser.newPage({
		headless: true,
		defaultViewport: null,
		args: ['--no-sandbox', '--single-process', '--no-zygote', '--disable-setuid-sandbox'],
	});
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
