import express from 'express';
const router = express.Router();
import {
  createNewAccount,
  getAccount,
  getTransactions,
  getBalanaces,
  makeTransaction,
} from '../controllers/ctrl';

router.post('/create-account', createNewAccount);

router.get('/balance/:accountNumber', getAccount);

router.get('/transactions', getTransactions);

router.get('/balance', getBalanaces);

router.post('/transfer', makeTransaction);

export default router;
