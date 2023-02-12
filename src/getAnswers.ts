const getAllPages = require('./getAllPages').default;
// const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity').default;
let chrome: any = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
	chrome = require('chrome-aws-lambda');
	puppeteer = require('puppeteer-core');
} else {
	puppeteer = require('puppeteer');
}

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	let options: any = {};

	if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
		options = {
			executablePath: './node_modules/chromium/lib/chromium/chrome-linux/chrome',

			args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
			defaultViewport: chrome.defaultViewport,
			ignoreDefaultArgs: ['--disable-extensions'],
			// executablePath: await chrome.executablePath,
			headless: true,
			ignoreHTTPSErrors: true,
		};
	}
	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);

	// get all tests links by request

	const AllPagesData = await getAllPages(page, topic, grade, subjectID);

	if (typeof AllPagesData === 'string') {
		return AllPagesData;
	}

	// get tests with same questions quantity

	const TestsWithCorrectQuestionsQuantity = await getTestsWithSamequestionsQuantity(
		AllPagesData,
		questionsQuantity
	);

	browser.close();
	return TestsWithCorrectQuestionsQuantity;
};
export default getAnswers;
