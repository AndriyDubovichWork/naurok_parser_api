import getTests from './getTests';

const getAllPages = async (page: any, query: string, grade: string, subjectId: string) => {
	let pageNumber = 1;
	const allTests = [];

	let PropperArrowClass = '';

	while (PropperArrowClass !== 'next disabled') {
		const url = `https://naurok.com.ua/site/search-resources?q=${query}&type%5B%5D=test&grade%5B%5D=${grade}&subject%5B%5D=${subjectId}&page=${pageNumber}`;
		await page.goto(url);

		const [nextPageArrow] = await page.$x('/html/body/div[3]/div/div/div[1]/div[2]/ul/li[12]');
		if (!nextPageArrow) {
			// if single page
			allTests.push(await getTests(page));
			pageNumber++;
			break;
		}
		const arrowClass = await nextPageArrow.getProperty('className');

		PropperArrowClass = await arrowClass.jsonValue();
		allTests.push(await getTests(page));
		pageNumber++;
	}

	return allTests;
};
export default getAllPages;
