const puppeteer = require('puppeteer-core');
const getAllPages = require('./getAllPages');
// const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity');

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	const browser = await puppeteer.launch({
		executablePath: '/chrome',
		headless: true,
		defaultViewport: null,
		args: ['--no-sandbox', '--single-process', '--no-zygote', '--disable-setuid-sandbox'],
	});
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
