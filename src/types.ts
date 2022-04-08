export interface Transactions {
  reference: string;
  from: string;
  amount: number;
  to: string;
  transferDescription: string;
  createdAt: Date;
}

export interface Balances {
  accountNumber: string;
  balance: number;
  createdAt: Date;
}
