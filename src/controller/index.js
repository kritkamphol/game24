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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const find24_1 = require("../utils/find24");
const masterDataService_1 = require("../service/masterDataService");
const app = (0, express_1.default)();
const port = 3000;
app.get('/cheat24', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let number = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.number;
    try {
        if (typeof number !== 'string') {
            return res.status(400).send("Invalid input");
        }
        if (number.includes("0")) {
            return res.status(400).send("There is 0 in the number");
        }
        if (number.length !== 4) {
            return res.status(400).send("Number needs to be exactly 4 characters long");
        }
        const formulas = yield (0, masterDataService_1.getData)(number);
        if (formulas.length === 0) {
            let result = (0, find24_1.find24)(number);
            if (result.length === 0) {
                return res.status(200).send("No solution for this number");
            }
            let bulk = [];
            result.forEach(res => {
                let f = { formula: res, number: number };
                bulk === null || bulk === void 0 ? void 0 : bulk.push(f);
            });
            yield (0, masterDataService_1.saveData)(bulk);
            return res.status(200).send(result);
        }
        return res.status(200).send(formulas);
    }
    catch (e) {
        // @ts-ignore
        return res.status(500).send(e.message);
    }
}));
(0, masterDataService_1.initialize)().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(() => {
    console.log("ERROR : From starting the server");
});
