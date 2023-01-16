"use strict";
// const { testType } = require('./types');
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
const getMatchedByQuestion = (page, tests, question) => __awaiter(void 0, void 0, void 0, function* () {
    const res = [];
    yield tests.map((test) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(test.link);
        yield page.goto(test.link);
        const [questionsElement] = yield page.$x('/html/body/div[3]/div[1]/div/div[2]/div[4]/div[1]');
        if (!questionsElement) {
            return test;
        }
        const questionsUnformat = yield questionsElement.getProperty('textContent');
        const questions = yield questionsUnformat.jsonValue();
        if (questions.toLowerCase().includes(question.toLowerCase())) {
            res.push(test);
        }
        return test;
    }));
    return res;
});
exports.default = getMatchedByQuestion;
//# sourceMappingURL=getMatchedByQuestion.js.map