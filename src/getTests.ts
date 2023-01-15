const getTests = async (page: any) => {
	const testData = await page.evaluate(() => {
		const questionsQuantity = Array.from(document.querySelectorAll('.testCounter'));
		const links = Array.from(document.querySelectorAll('.headline a'));
		const res = [];
		questionsQuantity.map((elem, id) => {
			res.push({
				questionsQuantity: elem.textContent,
				linkText: links[id].textContent,
				link: links[id].getAttribute('href'),
			});
		});
		return res;
	});

	return testData;
};
export default getTests;
