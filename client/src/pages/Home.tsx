import React, { useContext, useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';
import {
  TransactionDeleteFunc,
  TransactionGetFunc,
} from '../serverApi/serverApi';
import { TransactionInterface } from '../interfaces/transaction';
import { DatePicker, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment'; //moment js import required , dayjs aswel
import dayjs from 'dayjs';
import {
  BarChartOutlined,
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import Analytics from '../components/analytics';
import transitions from '@material-ui/core/styles/transitions';
import Profile from './Profile';
import TransactionContext from '../components/TransactionContext';

const { RangePicker } = DatePicker; // using antd RangePicker UI

function Home() {
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  // const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [frequency, setFrequency] = useState('10'); //will show all transactions in the last 10 days
  const [selectedRange, setSelectedRange] = useState<[string, string]>(); // range is 2 selected dates in string format
  const [type, setType] = useState('All'); //addition to set type
  const [category, setCategory] = useState('All'); //category filter state
  const [viewType, setViewType] = useState('table'); // viewtype for transition
  const [editTransaction, setEditTransaction] =
    useState<TransactionInterface | null>(null);
  const { transactions, setTransactions } = useContext(TransactionContext);
  // useEffect(() => {
  //   // console.log(selectedRange);
  //   if (!selectedRange) return;
  //   const start = moment(selectedRange[0]);
  //   const end = moment(selectedRange[1]);
  //   const diff = end.diff(start, 'days');
  //   // console.log(diff);
  // }, [selectedRange]);

  const getDateFromFrequency = (frequency: string): Date => {
    const days = parseInt(frequency); //turn frequency string to interger to feet setDate()
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date; //return date as a number, from start to end for transaction
  };

  useEffect(() => {
    // console.log('Types:', type);
    //
    const range = selectedRange || [
      dayjs()
        .subtract(frequency === 'custom' ? 0 : parseInt(frequency), 'day')
        .format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'), //designate format
    ];

    // console.log(range);

    TransactionGetFunc(frequency, type, category, range)
      .then((data: any) => {
        // console.log('Data:', data);
        // console.log('Frequency, Type, Range:', frequency, type, range);
        // add keys for antd's table to use when mapping
        setTransactions(data.map((data: any) => ({ ...data, key: data._id })));
      })
      .catch((error) => console.log(error));
  }, [frequency, selectedRange, type, category]);

  const handleAddedTransaction = (data: TransactionInterface) => {
    // console.log(data);
    if (new Date(data.date) >= getDateFromFrequency(frequency)) {
      setTransactions((prevState) => [...prevState, data]);
    }
  };

  const handleEditedTransaction = (
    updatedTransaction: TransactionInterface
  ) => {
    setTransactions((prevState) =>
      prevState.map((transaction) =>
        transaction._id === updatedTransaction._id
          ? updatedTransaction
          : transaction
      )
    );
  };

  const handleDeletedTransaction = (
    deletedTransaction: TransactionInterface
  ) => {
    setTransactions((prevState) => {
      console.log(prevState);
      return prevState.filter(
        (transaction) => transaction._id !== deletedTransaction._id
      );
    });
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
    {
      title: 'Edit | Delete',
      // key: '',

      render: (text, record) => {
        return (
          <div className='flex space-x-10'>
            <EditOutlined
              className='cursor-pointer'
              onClick={() => {
                // console.log(record);
                setEditTransaction(record);
                setTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className='cursor-pointer'
              onClick={() => {
                TransactionDeleteFunc(record);
                handleDeletedTransaction(record);
              }}
            />
          </div>
        );
      },
    },
  ];

  //filter by date tutorial
  // create a state
  //set value of selector to frequency
  //then setfrequency using onChange, and set the value for the time i.e. week would have value='7'
  //need to update the state after adding, otherwise it shows newly added transaction which is wrong

  return (
    <DefaultLayout>
      <div className='w-full flex flex-col'>
        <div className='flex justify-between border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500 w-full  '>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-center text-gray-500 '>Date</h4>
            <Select
              className='w-[140px]'
              value={frequency}
              onChange={(value) => setFrequency(value)}
            >
              <Select.Option value='7'>Past Week</Select.Option>
              <Select.Option value='30'>Past Month</Select.Option>
              <Select.Option value='365'>Past Year</Select.Option>
              <Select.Option value='custom'>Custom Range</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <RangePicker
                onChange={(_, dates) => setSelectedRange(dates)}
              ></RangePicker>
            )}
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-center text-gray-500'>Type</h4>
            <Select
              className='w-[100px]'
              value={type}
              onChange={(value) => setType(value)}
            >
              <Select.Option value='All'>All</Select.Option>
              <Select.Option value='Expense'>Expense</Select.Option>
              <Select.Option value='Income'>Income</Select.Option>
            </Select>
          </div>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-center text-gray-500'>
              Category
            </h4>
            <Select
              className='w-[200px]'
              value={category}
              onChange={(value) => setCategory(value)}
            >
              <Select.Option value='All'>All</Select.Option>
              <Select.Option value='Salary'>Salary</Select.Option>
              <Select.Option value='Food'>Food</Select.Option>
              <Select.Option value='Entertainment'>Entertainment</Select.Option>
              <Select.Option value='Travel'>Travel</Select.Option>
              <Select.Option value='Investment'>Investment</Select.Option>
              <Select.Option value='Short-Term Loan'>
                Short-Term Loan
              </Select.Option>
              <Select.Option value='Long-Term Loan'>
                Long-Term Loan
              </Select.Option>
              <Select.Option value='Miscellaneous'>Miscellaneous</Select.Option>
            </Select>
          </div>
          <div className='flex flex-row space-x-3 mt-5 border p-2 rounded-xl hover:shadow-xl transition duration-500 h-[45px] '>
            <div className=''>
              <UnorderedListOutlined
                className='opacity-50 hover:opacity-100 transition duration-300'
                onClick={() => setViewType('table')}
              />
            </div>
            <div>
              <BarChartOutlined
                className='opacity-50 hover:opacity-100 transition duration-300'
                onClick={() => setViewType('analytics')}
              />
            </div>
          </div>
          <button
            className='bg-gradient-to-t from-indigo-600 to-teal-300 pl-2 pr-2 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500 active:shadow-inherit opacity-75 hover:opacity-100 h-[50px] mt-3'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
        {viewType === 'table' ? (
          <div className='mt-3 hover:shadow-xl transition duration-500 rounded-lg animate-fade-in'>
            <Table
              columns={columns}
              dataSource={transactions.map((transaction, index) => ({
                ...transaction,
                key: index,
              }))}
              // key={
              //   type +
              //   frequency +
              //   (selectedRange ? selectedRange.join('') + category : '')
              // }
            />
          </div>
        ) : (
          <Analytics transactions={transactions} />
        )}
      </div>
      {transactionModal && (
        <TransactionsModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          handleAddedTransaction={handleAddedTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
          handleEditedTransaction={handleEditedTransaction}
        />
      )}
    </DefaultLayout>
  );
}

export default Home;
