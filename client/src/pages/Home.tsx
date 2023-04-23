import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import TransactionsModal from '../components/transactionsModal';
import { TransactionGetFunc } from '../serverApi/serverApi';
import { TransactionInterface } from '../interfaces/transaction';
import { DatePicker, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment'; //moment js import required , dayjs aswel
import dayjs from 'dayjs';
import { BarChartOutlined, UnorderedListOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker; // using antd RangePicker UI

function Home() {
  const [transactionModal, setTransactionModal] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [frequency, setFrequency] = useState('10'); //will show all transactions in the last 10 days
  const [selectedRange, setSelectedRange] = useState<[string, string]>(); // range is 2 selected dates in string format
  const [type, setType] = useState('All');
  const [category, setCategory] = useState('All');
  const [viewType, setViewType] = useState('table');
  useEffect(() => {
    // console.log(selectedRange);
    if (!selectedRange) return;
    const start = moment(selectedRange[0]);
    const end = moment(selectedRange[1]);
    const diff = end.diff(start, 'days');
    console.log(diff);
  }, [selectedRange]);

  const getDateFromFrequency = (frequency: string): Date => {
    const days = parseInt(frequency); //turn frequency string to interger to feet setDate()
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date; //return date as a number, from start to end for transaction
  };

  useEffect(() => {
    // console.log('Types:', type);
    const range = selectedRange || [
      dayjs().subtract(parseInt(frequency), 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'), //designate format
    ];

    TransactionGetFunc(frequency, type, category, range)
      .then((data: any) => {
        // console.log('Data:', data);
        // console.log('Frequency, Type, Range:', frequency, type, range);
        setTransactions(data);
      })
      .catch((error) => console.log(error));
  }, [frequency, selectedRange, type, category]);

  const handleAddedTransaction = (data: TransactionInterface) => {
    if (new Date(data.date) >= getDateFromFrequency(frequency)) {
      setTransactions((prevState) => [...prevState, data]);
    }
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
  //need to update the state after adding, otherwise it shows newly added transaction which is wrong

  return (
    <DefaultLayout>
      <div className='w-full flex flex-col'>
        <div className='flex justify-around border border-gray-400 p-3 rounded-xl hover:shadow-md transition duration-500 w-full'>
          <div className='flex flex-col'>
            <h4 className='font-semibold text-center'>Date</h4>
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
            <h4 className='font-semibold text-center'>Type</h4>
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
            <h4 className='font-semibold text-center'>Category</h4>
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
          <div className='flex flex-row space-x-3 mt-5 border p-2 rounded-xl hover:shadow-xl transition duration-500'>
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
            className='bg-gradient-to-t from-indigo-600 to-teal-300 pl-2 pr-2 text-white rounded-xl py-3 shadow-md hover:shadow-xl transition duration-500 active:shadow-inherit opacity-75 hover:opacity-100'
            onClick={() => setTransactionModal(true)}
          >
            Log Transaction
          </button>
        </div>
        {viewType === 'table' ? (
          <div className='mt-3 hover:shadow-xl transition duration-500 rounded-lg'>
            <Table
              columns={columns}
              dataSource={transactions}
              key={
                type + frequency + (selectedRange ? selectedRange.join('') : '')
              }
            />
          </div>
        ) : (
          'lol dawgy thought he would see somethin but got text instead'
        )}
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
