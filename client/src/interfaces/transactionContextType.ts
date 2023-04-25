import { TransactionInterface } from './transaction';

export interface TransactionContextType {
  transactions: TransactionInterface[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>;
}
