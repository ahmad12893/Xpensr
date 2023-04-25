import React, { createContext, useState } from 'react';
import { TransactionContextType } from '../interfaces/transactionContextType';
import { TransactionInterface } from '../interfaces/transaction';

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  setTransactions: () => {},
});

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
