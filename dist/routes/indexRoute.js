"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const ctrl_1 = require("../controllers/ctrl");
router.post('/create-account', async (req, res) => {
    try {
        const { balance } = req.body;
        const newAccount = await ctrl_1.createAccount(+balance);
        res.status(201).json({ msg: newAccount });
    }
    catch (error) {
        res.status(400).json({ msg: 'Something went wrong' });
    }
});
router.get('/balance/:accountNumber', async (req, res) => {
    const accountNumber = req.params.accountNumber;
    const balance = await ctrl_1.getSingleBalance(accountNumber);
    if (!balance) {
        res.status(404).json({ message: 'Account number does not exist' });
    }
    else {
        res.status(200).json({ msg: balance });
    }
});
router.get('/balance', async (req, res) => {
    try {
        const balances = await ctrl_1.getAllBalances();
        res.status(200).json(JSON.parse(balances));
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
});
router.post('/transfer', async (req, res) => {
    try {
        const transaction = req.body;
        const result = await ctrl_1.createTransaction(transaction);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }
});
exports.default = router;
//# sourceMappingURL=indexRoute.js.map