"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTestsWithSamequestionsQuantity = (input, NumberOfQuestions) => {
    const res = [];
    input.map((page) => {
        page.map((test) => {
            // console.log(test.questionsQuantity === NumberOfQuestions);
            test.link = 'https://naurok.com.ua' + test.link;
            if (test.questionsQuantity === NumberOfQuestions) {
                res.push(test);
            }
            return test;
        });
    });
    // console.log(res);
    return res;
};
exports.default = getTestsWithSamequestionsQuantity;
//# sourceMappingURL=getTestsWithSamequestionsQuantity.js.map