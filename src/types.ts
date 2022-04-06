export interface Transactions {
  reference: string
  senderAccountNumber: string
  amount: number
  receiverAccountNumber: string
  transferDescription: string
  createdAt: Date
}

export interface Balances {
  accountNumber: string
  balance: number
  createdAt: Date
}
