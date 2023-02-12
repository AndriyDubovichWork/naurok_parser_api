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
const puppeteer = require('puppeteer');
const getSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox', '--headless'],
    });
    const page = yield browser.newPage({
        headless: true,
        defaultViewport: null,
        args: ['--no-sandbox', '--single-process', '--no-zygote', '--disable-setuid-sandbox'],
    });
    yield page.setDefaultNavigationTimeout(0);
    yield page.goto('https://naurok.com.ua/site/search-resources?q=%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B0%D1%86%D1%96%D1%8F&type%5B%5D=test&grade%5B%5D=11&subject%5B%5D=3');
    const Subjects = yield page.evaluate(() => {
        let AllLabelsTags = Array.from(document.querySelectorAll('.content-block .checkbox div label'));
        const SubjectCheckBoxes = Array.from(document.querySelectorAll('input.subject-checkbox'));
        return SubjectCheckBoxes.map((CheckBoxID, id) => {
            const matchingCheckBoxID = id + 13;
            if (AllLabelsTags[matchingCheckBoxID]) {
                return {
                    subject: AllLabelsTags[matchingCheckBoxID].textContent.slice(1),
                    id: CheckBoxID.getAttribute('value'),
                };
            }
        });
    });
    return Subjects;
});
exports.default = getSubjects;
//# sourceMappingURL=getSubjects.js.map