"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.saveData = exports.getData = exports.initialize = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = __importStar(require("mongoose"));
const masterData_1 = require("../model/masterData");
dotenv_1.default.config();
const connectionString = process.env.DB_CONN_STRING || "";
const collectionName = process.env.COLLECTION_NAME || "";
mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});
let MasterData = mongoose.model(collectionName, masterData_1.masterDataSchema);
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        return mongoose.createConnection(connectionString);
    });
}
exports.initialize = initialize;
function getData(number) {
    return __awaiter(this, void 0, void 0, function* () {
        let formulas = [];
        const results = yield MasterData.find({ number: number }).then(result => {
            result.forEach(res => {
                formulas.push(res === null || res === void 0 ? void 0 : res.formula);
            });
        });
        return formulas;
    });
}
exports.getData = getData;
function saveData(masterData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return MasterData.insertMany(masterData);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.saveData = saveData;
