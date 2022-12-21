const puppeteer = require('puppeteer');
import getAllPages from './getAllPages';
// const getMatchedByQuestion = require('./getMatchedByQuestion');
import getTestsWithSamequestionsQuantity from './getTestsWithSamequestionsQuantity';

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
		args: ['--no-sandbox', '--headless'],
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
