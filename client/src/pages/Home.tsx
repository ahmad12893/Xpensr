import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';
import { TransactionGetFunc } from '../serverApi/serverApi';
import { TransactionInterface } from '../interfaces/transaction';

function Home() {
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  useEffect(() => {
    TransactionGetFunc()
      .then((data: any) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddedTransaction = (data: any) => {
    setTransactions((prevState: any) => [...prevState, data]);
  };

  /*
  create bar on top, with button to log transactions
  ensure to maintain 3-d effect and color scheme
  make a modal pop up when the button is clicked
  create modal using ant design ui component
  */
  return (
    <DefaultLayout>
      <div className='w-full flex flex-col'>
        <div className='flex justify-end border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500'>
          <button
            className='bg-blue-400 p-4 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
        <div>
          {transactions.map((transaction) => (
            <>
              <div className='flex flex-row'>
                <h1 className='ml-2'>{transaction.type}</h1>
                <h1 className='ml-2'>{transaction.amount}</h1>
                <h1 className='ml-2'>{transaction.date}</h1>
                <h1 className='ml-2'>{transaction.description}</h1>
                <h1 className='ml-2'>{transaction.reference}</h1>
                <h1 className='ml-2'>{transaction.category}</h1>
              </div>
            </>
          ))}
        </div>
      </div>

      {transactionModal && (
        <TransactionsModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          handleAddedTransaction={handleAddedTransaction}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
