import express from 'express';
const router = express.Router();
import {
  getAllBalances,
  getSingleBalance,
  createAccount,
  createTransaction,
} from '../controllers/ctrl';

router.post('/create-account', async (req, res) => {
  const { balance } = req.body;
  const newAccount = await createAccount(+balance);
  // .then(account => {
  //   res.status(201).json(account);
  // })
  // .catch(err => {
  //   res.status(500).json(err);
  // });
  // res.status(201).send(newAccount);
  res.status(201).json({ msg: newAccount });
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
  const balances = await getAllBalances();
  res.status(200).json(JSON.parse(balances));
});

router.post('/transfer', async (req, res) => {
  const transaction = req.body;
  const result = await createTransaction(transaction);
  res.status(200).json(result);
});

export default router;
