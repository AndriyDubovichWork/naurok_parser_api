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
const getTests = require('./getTests').default;
const getAllPages = (page, query, grade, subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    let pageNumber = 1;
    const allTests = [];
    let PropperArrowClass = '';
    while (PropperArrowClass !== 'next disabled') {
        const url = `https://naurok.com.ua/site/search-resources?q=${query}&type%5B%5D=test&grade%5B%5D=${grade}&subject%5B%5D=${subjectId}&page=${pageNumber}`;
        yield page.goto(url);
        const [nextPageArrow] = yield page.$x('/html/body/div[3]/div/div/div[1]/div[2]/ul/li[12]');
        if (!nextPageArrow) {
            // if single page
            allTests.push(yield getTests(page));
            pageNumber++;
            break;
        }
        const arrowClass = yield nextPageArrow.getProperty('className');
        PropperArrowClass = yield arrowClass.jsonValue();
        allTests.push(yield getTests(page));
        pageNumber++;
    }
    return allTests;
});
exports.default = getAllPages;
//# sourceMappingURL=getAllPages.js.map