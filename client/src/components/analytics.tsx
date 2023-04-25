import { Progress } from 'antd';
import React from 'react';
import { TransactionInterface } from '../interfaces/transaction';

function Analytics({ transactions }: any) {
  // console.log(transactions);
  const totalTransactions = transactions.length;

  const totalIncomeTrans = transactions.filter(
    //filter all transaction value by income
    (transaction: any) => transaction.type === 'Income'
  );
  const totalExpenseTrans = transactions.filter(
    // filter all transaction values by expense
    (transaction: any) => transaction.type === 'Expense'
  );

  const IncomePercentage = (totalIncomeTrans.length / totalTransactions) * 100;

  const ExpensePercentage =
    (totalExpenseTrans.length / totalTransactions) * 100;

  const totalTransactionValue = transactions.reduce(
    (acc: number, transaction: TransactionInterface) => {
      // console.log('transaction amount:', transaction.amount);
      // console.log('acc:', acc);

      return acc + +transaction.amount;
    },
    0
  );
  // console.log('totalTransactionvalue:', totalTransactionValue);

  const totalIncomeValue = transactions
    .filter((transaction: { type: string }) => transaction.type === 'Income')
    .reduce(
      (acc: number, transaction: TransactionInterface) =>
        acc + +transaction.amount,
      0
    );
  const totalExpenseValue = transactions
    .filter((transaction: { type: string }) => transaction.type === 'Expense')
    .reduce(
      (acc: number, transaction: TransactionInterface) =>
        acc + +transaction.amount,
      0
    );

  const IncomeValuePercent = (totalIncomeValue / totalTransactionValue) * 100;
  const ExpenseValuePercent = (totalExpenseValue / totalTransactionValue) * 100;

  const categories = [
    'Salary',
    'Food',
    'Entertainment',
    'Travel',
    'Investment',
    'Short-Term Loan',
    'Long-Term Loan',
    'Miscellaneous',
  ];
  return (
    <>
      <div className='mt-3 hover:shadow-xl transition duration-500 rounded-lg animate-fade-in flex justify-center '>
        <div className='m-5 flex flex-col w-50 border p-5 border-gray-200 rounded-xl hover:shadow-xl transition duration-500'>
          <p className='text-center text-4xl'>
            Total Transactions : {totalTransactions}
          </p>
          <hr />
          <p className='text-center text-3xl mt-3'>
            Income : {totalIncomeTrans.length}
          </p>
          <p className='text-center text-3xl mt-3'>
            Expense : {totalExpenseTrans.length}
          </p>
          <hr />
          <div className='mt-5 '>
            <Progress
              type='circle'
              percent={Number(IncomePercentage.toFixed())}
              className='m-5'
              size={300}
            />
            <Progress
              type='circle'
              percent={Number(ExpensePercentage.toFixed())}
              strokeColor='red'
              className='m-5'
              size={300}
            />
          </div>
        </div>
        <div className='m-5 flex flex-col w-50 border p-5 border-gray-200 rounded-xl hover:shadow-xl transition duration-500'>
          <p className='text-center text-4xl'>
            Total : {totalTransactionValue}
          </p>
          <hr />
          <p className='text-center text-3xl mt-3'>
            Income : {totalIncomeValue}
          </p>
          <p className='text-center text-3xl mt-3'>
            Expense : {totalExpenseValue}
          </p>
          <hr />
          <div className='mt-5 '>
            <Progress
              type='circle'
              percent={Number(IncomeValuePercent.toFixed())}
              className='m-5'
              size={300}
            />
            <Progress
              type='circle'
              percent={Number(ExpenseValuePercent.toFixed())}
              strokeColor='red'
              className='m-5'
              size={300}
            />
          </div>
        </div>
      </div>
      <div className='mt-5 hover:shadow-xl transition duration-500 rounded-lg animate-fade-in flex  flex-row justify-around border p-5 border-gray-200'>
        <div className='flex flex-col text-4xl hover:shadow-xl transition duration-500 rounded-lg animate-fade-in border p-5 border-gray-200   w-full md:w-1/2'>
          <p className='mb-7'>Income Categories</p>
          <hr />
          {categories.map((category) => {
            // console.log(transactions);
            // console.log(category);
            const amount = transactions
              .filter(
                (transaction: TransactionInterface) =>
                  transaction.type === 'Income' &&
                  transaction.category === category
              )
              .reduce(
                (acc: number, transaction: TransactionInterface) =>
                  acc + transaction.amount,
                0
              );
            // console.log(amount);
            return (
              <div key={category}>
                <p className='text-center'>{category}</p>
                <div className='flex hover:shadow-xl transition duration-500 rounded-lg animate-fade-in border p-5 border-gray-200'>
                  <Progress
                    percent={+((amount / totalIncomeValue) * 100).toFixed(0)}
                  />
                  {/* <p>{amount}</p> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex flex-col text-4xl hover:shadow-xl transition duration-500 rounded-lg animate-fade-in border p-5 border-gray-200  w-full md:w-1/2'>
          <p className='mb-7'>Expense Categories</p>
          <hr />
          {categories.map((category) => {
            // console.log(transactions);
            // console.log(category);
            const amount = transactions
              .filter(
                (transaction: TransactionInterface) =>
                  transaction.type === 'Expense' &&
                  transaction.category === category
              )
              .reduce(
                (acc: number, transaction: TransactionInterface) =>
                  acc + transaction.amount,
                0
              );
            // console.log(amount);
            return (
              <div key={category}>
                <p className='text-center'>{category}</p>
                <div className=' flex hover:shadow-xl transition duration-500 rounded-lg animate-fade-in border p-5 border-gray-200'>
                  <Progress
                    percent={+((amount / totalExpenseValue) * 100).toFixed(0)}
                    strokeColor='red'
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Analytics;
