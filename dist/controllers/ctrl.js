"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.createAccount = exports.getSingleBalance = exports.getAllTransactions = exports.getAllBalances = void 0;
const model_1 = require("../models/model");
const node_crypto_1 = require("node:crypto");
const zod_1 = __importDefault(require("zod"));
const createAccountSchema = zod_1.default.object({
    accountNumber: zod_1.default.string().optional(),
    balance: zod_1.default.number(),
    createdAt: zod_1.default.string().optional(),
});
const createTransferSchema = zod_1.default.object({
    reference: zod_1.default.string().optional(),
    senderAccountNumber: zod_1.default.string(),
    amount: zod_1.default.number(),
    receiverAccountNumber: zod_1.default.string(),
    transferDescription: zod_1.default.string(),
    createdAt: zod_1.default.string().optional(),
});
function getAllBalances() {
    return model_1.readBalancesDB();
}
exports.getAllBalances = getAllBalances;
function getAllTransactions() {
    return model_1.readTransactionsDB();
}
exports.getAllTransactions = getAllTransactions;
async function getSingleBalance(accountNumber) {
    const data = await model_1.readBalancesDB();
    const balances = JSON.parse(data);
    const singleBalance = balances.find((balance) => balance.accountNumber === accountNumber);
    if (!singleBalance) {
        return { message: 'Account number does not exist' };
    }
    return singleBalance;
}
exports.getSingleBalance = getSingleBalance;
async function createAccount(balance) {
    const value = createAccountSchema.parse({ balance });
    const data = await model_1.readBalancesDB();
    const existingBalances = JSON.parse(data);
    // generate random account number of 10 digits
    const accountNumber = Math.floor(Math.random() * 1000000000000).toString();
    const account = {
        ...value,
        accountNumber,
        createdAt: new Date(),
    };
    existingBalances.push(account);
    await model_1.writeBalancesDB(existingBalances);
    return account;
}
exports.createAccount = createAccount;
async function createTransaction(transaction) {
    const value = createTransferSchema.parse(transaction);
    const readTransactionsFile = await model_1.readTransactionsDB();
    const existingTransactions = JSON.parse(readTransactionsFile);
    const readBalancesFile = await model_1.readBalancesDB();
    const existingBalances = JSON.parse(readBalancesFile);
    const transfer = {
        ...value,
        reference: node_crypto_1.randomUUID(),
        createdAt: new Date(),
    };
    const senderIndex = existingBalances.findIndex((balance) => balance.accountNumber === transaction.senderAccountNumber);
    if (senderIndex === -1)
        throw new Error('Sender account number does not exist');
    const senderBalance = existingBalances[senderIndex];
    if (senderBalance.balance < transaction.amount) {
        return { message: 'Insufficient balance' };
    }
    const receiverIndex = existingBalances.findIndex((balance) => balance.accountNumber === transaction.receiverAccountNumber);
    const receiverBalance = existingBalances[receiverIndex];
    if (receiverIndex === -1) {
        senderBalance.balance -= transaction.amount;
    }
    else {
        senderBalance.balance -= transaction.amount;
        receiverBalance.balance += transaction.amount;
    }
    await model_1.writeBalancesDB(existingBalances);
    existingTransactions.push(transfer);
    await model_1.writeTransactionsDB(existingTransactions);
    return transfer;
}
exports.createTransaction = createTransaction;
//# sourceMappingURL=ctrl.js.map