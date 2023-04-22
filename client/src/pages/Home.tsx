import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';
import { TransactionGetFunc } from '../serverApi/serverApi';
import { TransactionInterface } from '../interfaces/transaction';
import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';

function Home() {
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [frequency, setFrequency] = useState('10'); //will show last 10 transactions

  useEffect(() => {
    TransactionGetFunc(frequency)
      .then((data: any) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  }, [frequency]);

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
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD-MM-YYYY'),
    },
    { title: 'Reference', dataIndex: 'reference', key: 'reference' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  //filter by date tutorial
  // create a state
  //set value of selector to frequency
  //then setfrequency using onChange, and set the value for the time i.e. week would have value='7'
  return (
    <DefaultLayout>
      <div className='w-full flex flex-col'>
        <div className='flex justify-around border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500 w-full'>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-center'>Filter By</h4>
            <Select
              className='w-[100px]'
              value={frequency}
              onChange={(value) => setFrequency(value)}
            >
              <Select.Option value='7'>Past Week</Select.Option>
              <Select.Option value='30'>Past Month</Select.Option>
              <Select.Option value='365'>Past Year</Select.Option>
            </Select>
          </div>
          <button
            className='bg-gradient-to-t from-indigo-600 to-teal-300 pl-2 pr-2 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500 active:shadow-inherit opacity-75 hover:opacity-100'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
        <div className='mt-3 hover:shadow-xl transition duration-500 rounded-lg'>
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
