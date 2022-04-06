import fs from 'node:fs/promises';
import path from 'node:path';

const transaction_db = path.join(__dirname, '../../data/transactionsDB.json');
const balance_db = path.join(__dirname, '../../data/balancesDB.json');

export async function readTransactionsDB() {
  try {
    return await fs.readFile(transaction_db, 'utf8');
  } catch (error) {
    await fs.writeFile(transaction_db, JSON.stringify([]));
    return await fs.readFile(transaction_db, 'utf8');
  }
}

export async function writeTransactionsDB(data: any) {
  await fs.writeFile(transaction_db, JSON.stringify(data));
}

export async function readBalancesDB() {
  try {
    return await fs.readFile(balance_db, 'utf8');
  } catch (error) {
    await fs.writeFile(balance_db, JSON.stringify([]));
    return await fs.readFile(balance_db, 'utf8');
  }
}

export async function writeBalancesDB(data: any) {
  await fs.writeFile(balance_db, JSON.stringify(data));
}
