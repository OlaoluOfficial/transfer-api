import {
  readBalancesDB,
  readTransactionsDB,
  writeBalancesDB,
  writeTransactionsDB,
} from '../models/model';
import { randomUUID } from 'node:crypto';

import { Transactions, Balances } from '../types';

import zod from 'zod';

const createAccountSchema = zod.object({
  accountNumber: zod.string().optional(),
  balance: zod.number(),
  createdAt: zod.string().optional(),
});

const createTransferSchema = zod.object({
  reference: zod.string().optional(),
  senderAccountNumber: zod.string(),
  amount: zod.number(),
  receiverAccountNumber: zod.string(),
  transferDescription: zod.string(),
  createdAt: zod.string().optional(),
});

export function getAllBalances() {
  return readBalancesDB();
}
export function getAllTransactions() {
  return readTransactionsDB();
}
export async function getSingleBalance(accountNumber: string) {
  const data = await readBalancesDB();
  const balances = JSON.parse(data);
  const singleBalance = balances.find(
    (balance: any) => balance.accountNumber === accountNumber
  );
  if (!singleBalance) {
    return { message: 'Account number does not exist' };
  }
  return singleBalance;
}

export async function createAccount(balance: number) {
  const value = createAccountSchema.parse({ balance });
  const data = await readBalancesDB();
  const existingBalances = JSON.parse(data);

  const accountNumber = Math.floor(Math.random() * 1000000000000).toString();

  const account: Balances = {
    ...value,
    accountNumber,
    createdAt: new Date(),
  };

  existingBalances.push(account);
  await writeBalancesDB(existingBalances);
  return account;
}

export async function createTransaction(transaction: Transactions) {
  const value = createTransferSchema.parse(transaction);

  const readTransactionsFile = await readTransactionsDB();
  const existingTransactions = JSON.parse(readTransactionsFile);
  const readBalancesFile = await readBalancesDB();
  const existingBalances = JSON.parse(readBalancesFile);

  const transfer: Transactions = {
    ...value,
    reference: randomUUID(),
    createdAt: new Date(),
  };

  const senderIndex = existingBalances.findIndex(
    (balance: any) => balance.accountNumber === transaction.senderAccountNumber
  );
  if (senderIndex === -1)
    throw new Error('Sender account number does not exist');

  const senderBalance = existingBalances[senderIndex];

  if (senderBalance.balance < transaction.amount) {
    return { message: 'Insufficient balance' };
  }

  const receiverIndex = existingBalances.findIndex(
    (balance: any) =>
      balance.accountNumber === transaction.receiverAccountNumber
  );

  if (receiverIndex === -1) {
    return { message: 'Receiver account number does not exist' };
  }

  const receiverBalance = existingBalances[receiverIndex];

  senderBalance.balance -= transaction.amount;
  receiverBalance.balance += transaction.amount;

  await writeBalancesDB(existingBalances);

  existingTransactions.push(transfer);
  await writeTransactionsDB(existingTransactions);
  return transfer;
}
