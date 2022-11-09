const getTests = async (page: any) => {
  const testData = await page.evaluate(() => {
    const questionsNumber = Array.from(
      document.querySelectorAll('.testCounter')
    );
    const links = Array.from(document.querySelectorAll('.headline a'));
    const res = [];
    questionsNumber.map((elem, id) => {
      res.push({
        questionsNumber: elem.textContent,
        linkText: links[id].textContent,
        link: links[id].getAttribute('href'),
      });
    });
    return res;
  });

  return testData;
};
export default getTests;
