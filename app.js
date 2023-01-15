var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// import getTests from './api/getTests';
var getAnswers = require('./api/getAnswers')["default"];
var getSubjects = require('./api/getSubjects')["default"];
var express = require('express');
//change node to 18
var app = express();
var port = process.env.PORT || 3000;
var cors = require('cors');
// const link = '0.0.0.0';
process.setMaxListeners(4000);
app.use(express.json());
//CORS
app.use(cors({
    origin: 'http://localhost'
}));
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    next();
};
app.use(allowCrossDomain);
//Get answers
app.get('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, topic, grade, subjectID, questionsQuantity, answers;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, topic = _a.topic, grade = _a.grade, subjectID = _a.subjectID, questionsQuantity = _a.questionsQuantity;
                if (!(!topic || !grade || !subjectID || !questionsQuantity)) return [3 /*break*/, 1];
                //check for missing parameters
                res.status(400);
                res.send('incorrect request (missing some parameters)');
                return [3 /*break*/, 4];
            case 1:
                if (!(grade <= 0 || subjectID <= 0 || questionsQuantity <= 0)) return [3 /*break*/, 2];
                //check for incorrect values
                res.status(400);
                res.send('incorrect request parameters');
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, getAnswers(topic, grade, subjectID, questionsQuantity)];
            case 3:
                answers = _b.sent();
                if (answers.length > 0) {
                    res.status(200);
                    res.send(answers);
                }
                else {
                    res.status(502);
                    res.send('could not find any tests by this request');
                }
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
//get subjects
app.get('/subjects', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var resoult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSubjects()];
            case 1:
                resoult = _a.sent();
                // check for correct respond
                if (resoult) {
                    res.status(200);
                    res.send(resoult);
                }
                else {
                    res.status(404);
                    res.send('error not found');
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Example app listening on port:".concat(port));
});
