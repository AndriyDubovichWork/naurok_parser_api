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
		headless: false,
		defaultViewport: null,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	const AllPagesData = await getAllPages(page, topic, grade, subjectID);
	if (AllPagesData === 'error') {
		return 'error';
	}
	const TestsWithCorrectQuestionsQuantity = await getTestsWithSamequestionsQuantity(
		AllPagesData,
		questionsQuantity
	);

	// const matched = await getMatchedByQuestion(
	//   page,
	//   TestsWithCorrectQuestionsQuantity,
	//   'Здатність організмів'
	// );
	// console.log(matched);
	browser.close();
	return TestsWithCorrectQuestionsQuantity;
};
export default getAnswers;
