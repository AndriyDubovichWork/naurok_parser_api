const puppeteer = require('puppeteer');
const getAllPages = require('./getAllPages');
const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity');

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	const browser = await puppeteer.launch();
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
