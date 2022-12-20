"use strict";
// import { testType } from './types';
exports.__esModule = true;
var getTestsWithSamequestionsQuantity = function (input, NumberOfQuestions) {
    var res = [];
    input.map(function (page) {
        page.map(function (test) {
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
exports["default"] = getTestsWithSamequestionsQuantity;
