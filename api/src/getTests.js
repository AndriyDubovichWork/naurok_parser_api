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
const getTests = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const testData = yield page.evaluate(() => {
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
});
exports.default = getTests;
//# sourceMappingURL=getTests.js.map