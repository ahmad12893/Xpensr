export interface TransactionsModalProps {
  transactionModal: boolean;
  setTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddedTransaction: (data: any) => void;
}