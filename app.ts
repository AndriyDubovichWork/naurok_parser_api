// import getTests from './src/getTests';
import getAnswers from './src/getAnswers';
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const link = '0.0.0.0';

app.use(express.json());

app.get('/', async (req, res) => {
	const { topic, grade, subjectID, questionsQuantity } = req.query;
	if (!topic || !grade || !subjectID || !questionsQuantity) {
		res.send('incorrect request');
	} else {
		res.send(await getAnswers(topic, grade, subjectID, questionsQuantity));
	}
});

app.listen(port, link, () => {
	console.log(`Example app listening on port ${link}:${port}`);
});
('http://localhost:3000/?topic=%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0%20%D0%B2%20%D1%83%D0%BC%D0%BE%D0%B2%D0%B0%D1%85%20%D0%B4%D0%B5%D1%81%D1%82%D0%B0%D0%BB%D1%96%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%97&grade=11&subjectID=8&questionsQuantity=23');
