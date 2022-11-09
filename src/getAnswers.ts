const puppeteer = require('puppeteer');
import getAllPages from './getAllPages';
import getMatchedByQuestion from './getMatchedByQuestion';
import getTestsWithSameQuestionsNumber from './getTestsWithSameQuestionsNumber';

const getAnswers = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const AllPagesData = await getAllPages(
    page,
    'україна в умовах десталінізації',
    '11',
    '8'
  );
  if (AllPagesData === 'error') {
    return 'error';
  }
  const TestsWithCorrectQuestionsQuantity =
    await getTestsWithSameQuestionsNumber(AllPagesData, '23');

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
