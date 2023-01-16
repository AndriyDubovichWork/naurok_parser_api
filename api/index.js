var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import getTests from './src/getTests';
const getAnswers = require('./src/getAnswers').default;
const getSubjects = require('./src/getSubjects').default;
const express = require('express');
//change node to 18
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
// const link = '0.0.0.0';
process.setMaxListeners(4000);
app.use(express.json());
//CORS
app.use(cors({
    origin: 'http://localhost',
}));
const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
};
app.use(allowCrossDomain);
//Get answers
app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { topic, grade, subjectID, questionsQuantity } = req.query;
    if (!topic || !grade || !subjectID || !questionsQuantity) {
        //check for missing parameters
        res.status(400);
        res.send('incorrect request (missing some parameters)');
    }
    else if (grade <= 0 || subjectID <= 0 || questionsQuantity <= 0) {
        //check for incorrect values
        res.status(400);
        res.send('incorrect request parameters');
    }
    else {
        // if every values is ok
        const answers = yield getAnswers(topic, grade, subjectID, questionsQuantity);
        if (answers.length > 0) {
            res.status(200);
            res.send(answers);
        }
        else {
            res.status(502);
            res.send('could not find any tests by this request');
        }
    }
}));
//get subjects
app.get('/subjects', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const resoult = yield getSubjects();
    // check for correct respond
    if (resoult) {
        res.status(200);
        res.send(resoult);
    }
    else {
        res.status(404);
        res.send('error not found');
    }
}));
app.listen(port, () => {
    console.log(`Example app listening on port:${port}`);
});
//# sourceMappingURL=index.js.map