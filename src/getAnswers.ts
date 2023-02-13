const getAllPages = require('./getAllPages').default;
// const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity').default;
const puppeteer = require('puppeteer');

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
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
