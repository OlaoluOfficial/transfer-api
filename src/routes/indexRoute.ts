import express from 'express';
const router = express.Router();
import {
  getAllBalances,
  getSingleBalance,
  createAccount,
  createTransaction,
} from '../controllers/ctrl';

router.post('/create-account', async (req, res) => {
  try {
    const { balance } = req.body;
    const newAccount = await createAccount(+balance);
    res.status(201).json({ msg: newAccount });
  } catch (error) {
    res.status(400).json({ msg: 'Something went wrong' });
  }
});

router.get('/balance/:accountNumber', async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const balance = await getSingleBalance(accountNumber);
  if (!balance) {
    res.status(404).json({ message: 'Account number does not exist' });
  } else {
    res.status(200).json({ msg: balance });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const balances = await getAllBalances();
    res.status(200).json(JSON.parse(balances));
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

router.post('/transfer', async (req, res) => {
  try {
    const transaction = req.body;
    const result = await createTransaction(transaction);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export default router;
