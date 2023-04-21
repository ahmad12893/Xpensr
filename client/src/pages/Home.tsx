import React, { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';

function Home() {
  const [transactionModal, setTransactionModal] = useState<boolean>(false);

  /*
  create bar on top, with button to log transactions
  ensure to maintain 3-d effect and color scheme
  make a modal pop up when the button is clicked
  create modal using ant design ui component
  */
  return (
    <DefaultLayout>
      <div className='w-full'>
        <div className='flex justify-end border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500'>
          <button
            className='bg-blue-400 p-4 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
      </div>
      {transactionModal && (
        <TransactionsModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
