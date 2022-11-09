import getTests from './src/getTests';
import getAnswers from './src/getAnswers';
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send(await getAnswers());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

('https://naurok.com.ua/site/search-resources?q=%27%D0%90%D0%B4%D0%B0%D0%BF%D1%82%D0%B0%D1%86%D1%96%D1%8F%27&type%5B0%5D=test&grade%5B0%5D=11&subject%5B0%5D=3&page=16');
