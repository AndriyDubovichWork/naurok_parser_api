import { testType } from './types';

const getMatchedByQuestion = async (
  page: any,
  tests: testType[],
  question: string
) => {
  const res = [];
  await tests.map(async (test) => {
    console.log(test.link);
    await page.goto(test.link);
    const [questionsElement] = await page.$x(
      '/html/body/div[3]/div[1]/div/div[2]/div[4]/div[1]'
    );
    if (!questionsElement) {
      return test;
    }
    const questionsUnformat = await questionsElement.getProperty('textContent');
    const questions = await questionsUnformat.jsonValue();
    if (questions.toLowerCase().includes(question.toLowerCase())) {
      res.push(test);
    }
    return test;
  });

  return res;
};

export default getMatchedByQuestion;
