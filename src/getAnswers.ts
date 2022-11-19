const puppeteer = require('puppeteer');
import getAllPages from './getAllPages';
// const getMatchedByQuestion = require('./getMatchedByQuestion');
import getTestsWithSamequestionsQuantity from './getTestsWithSamequestionsQuantity';
const Xvfb = require('xvfb');
const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	const xvfb = new Xvfb({
		silent: true,
		xvfb_args: ['-screen', '0', '1280x720x24', '-ac'],
	});
	xvfb.startSync();
	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox', '--start-fullscreen', '--display=' + xvfb._display],
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
	xvfb.stopSync();
	return TestsWithCorrectQuestionsQuantity;
};
export default getAnswers;
