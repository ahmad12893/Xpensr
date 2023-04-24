import { TransactionInterface } from './transaction';

export interface TransactionsModalProps {
  transactionModal: boolean;
  setTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddedTransaction: (data: any) => void;
  editTransaction: any;
  setEditTransaction: any;
  handleEditedTransaction: any;
}
