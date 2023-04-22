import React, { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';
import { TransactionGetFunc } from '../serverApi/serverApi';
import { TransactionInterface } from '../interfaces/transaction';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterTwoTone } from '@ant-design/icons';

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

  //antd Table columns from antd UI webpage
  const columns: ColumnsType<TransactionInterface> = [
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  return (
    <DefaultLayout>
      <div className='w-full flex flex-col'>
        <div className='flex justify-around border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500 w-full'>
          <div className='mt-2'>
            <FilterTwoTone />
          </div>
          <button
            className='bg-blue-400 p-4 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
        <div className='mt-3 hover:shadow-xl transition duration-500'>
          <Table columns={columns} dataSource={transactions} />
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
