import { testType } from './types';

const getTestsWithSameQuestionsNumber = (
  input: testType[][],
  NumberOfQuestions: string
) => {
  const res = [];
  input.map((page) => {
    page.map((test) => {
      // console.log(test.questionsNumber === NumberOfQuestions);

      test.link = 'https://naurok.com.ua' + test.link;

      if (test.questionsNumber === NumberOfQuestions) {
        res.push(test);
      }
      return test;
    });
  });
  // console.log(res);
  return res;
};

export default getTestsWithSameQuestionsNumber;
