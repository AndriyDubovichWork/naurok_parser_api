const puppeteer = require('puppeteer');
const getAllPages = require('./getAllPages');
// const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity');
const PCR = require('puppeteer-chromium-resolver');

const getAnswers = async (
	topic: string,
	grade: string,
	subjectID: string,
	questionsQuantity: string
) => {
	const option = {
		revision: '',
		detectionPath: '',
		folderName: '.chromium-browser-snapshots',
		defaultHosts: ['https://storage.googleapis.com', 'https://npm.taobao.org/mirrors'],
		hosts: [],
		cacheRevisions: 2,
		retry: 3,
		silent: false,
	};
	const stats = await PCR(option);

	const browser = await puppeteer.launch({
		headless: true,
		defaultViewport: null,
		args: ['--no-sandbox', '--headless'],
		executablePath: stats.executablePath,
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
