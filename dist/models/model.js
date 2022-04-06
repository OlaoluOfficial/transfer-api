"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBalancesDB = exports.readBalancesDB = exports.writeTransactionsDB = exports.readTransactionsDB = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const transaction_db = node_path_1.default.join(__dirname, '../../data/transactionsDB.json');
const balance_db = node_path_1.default.join(__dirname, '../../data/balancesDB.json');
async function readTransactionsDB() {
    try {
        return await promises_1.default.readFile(transaction_db, 'utf8');
    }
    catch (error) {
        await promises_1.default.writeFile(transaction_db, JSON.stringify([]));
        return await promises_1.default.readFile(transaction_db, 'utf8');
    }
}
exports.readTransactionsDB = readTransactionsDB;
async function writeTransactionsDB(data) {
    await promises_1.default.writeFile(transaction_db, JSON.stringify(data));
}
exports.writeTransactionsDB = writeTransactionsDB;
async function readBalancesDB() {
    try {
        return await promises_1.default.readFile(balance_db, 'utf8');
    }
    catch (error) {
        await promises_1.default.writeFile(balance_db, JSON.stringify([]));
        return await promises_1.default.readFile(balance_db, 'utf8');
    }
}
exports.readBalancesDB = readBalancesDB;
async function writeBalancesDB(data) {
    await promises_1.default.writeFile(balance_db, JSON.stringify(data));
}
exports.writeBalancesDB = writeBalancesDB;
//# sourceMappingURL=model.js.map