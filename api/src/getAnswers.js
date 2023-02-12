"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllPages = require('./getAllPages').default;
// const getMatchedByQuestion = require('./getMatchedByQuestion');
const getTestsWithSamequestionsQuantity = require('./getTestsWithSamequestionsQuantity').default;
let chrome = {};
let puppeteer;
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    chrome = require('chrome-aws-lambda');
    puppeteer = require('puppeteer-core');
}
else {
    puppeteer = require('puppeteer');
}
const getAnswers = (topic, grade, subjectID, questionsQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {};
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        options = {
            args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
            defaultViewport: chrome.defaultViewport,
            executablePath: yield chrome.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        };
    }
    const browser = yield puppeteer.launch(options);
    const page = yield browser.newPage();
    yield page.setDefaultNavigationTimeout(0);
    // get all tests links by request
    const AllPagesData = yield getAllPages(page, topic, grade, subjectID);
    if (typeof AllPagesData === 'string') {
        return AllPagesData;
    }
    // get tests with same questions quantity
    const TestsWithCorrectQuestionsQuantity = yield getTestsWithSamequestionsQuantity(AllPagesData, questionsQuantity);
    browser.close();
    return TestsWithCorrectQuestionsQuantity;
});
exports.default = getAnswers;
//# sourceMappingURL=getAnswers.js.map