export interface TransactionInterface {
  [x: string]: any;
  amount: number;
  type: string;
  category: string;
  date: string;
  reference: string;
  description: string;
}
