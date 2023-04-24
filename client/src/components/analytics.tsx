import { Progress } from 'antd';
import React from 'react';
import { TransactionInterface } from '../interfaces/transaction';

function Analytics({ transactions }: any) {
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
    (acc: any, transaction: TransactionInterface) => acc + transaction.amount,
    0
  );
  const totalIncomeValue = transactions
    .filter((transaction: { type: string }) => transaction.type === 'Income')
    .reduce(
      (acc: any, transaction: TransactionInterface) => acc + transaction.amount,
      0
    );
  const totalExpenseValue = transactions
    .filter((transaction: { type: string }) => transaction.type === 'Expense')
    .reduce(
      (acc: any, transaction: TransactionInterface) => acc + transaction.amount,
      0
    );

  const IncomeValuePercent = (totalIncomeValue / totalTransactionValue) * 100;
  const ExpenseValuePercent = (totalExpenseValue / totalTransactionValue) * 100;
  return (
    <div className='mt-3 hover:shadow-xl transition duration-500 rounded-lg animate-fade-in'>
      <div className=' w-screen md:w-1/3 m-4 border border-gray-200 flex rounded-xl hover:shadow-xl transition duration-500 '>
        <div className='m-5 flex flex-col w-50'>
          <h1 className='text-center'>
            Total Transactions : {totalTransactions}
          </h1>
          <hr />
          <h2 className='text-center'>Income : {totalIncomeTrans.length}</h2>
          <h2 className='text-center'>Expense : {totalExpenseTrans.length}</h2>
          <div className='mt-5 '>
            <Progress
              type='circle'
              percent={Number(IncomePercentage.toFixed())}
              className='m-5'
            />
            <Progress
              type='circle'
              percent={Number(ExpensePercentage.toFixed())}
              strokeColor='red'
              className='m-5'
            />
          </div>
        </div>
        <div className='m-5 flex flex-col w-50'>
          <h1 className='text-center'>Total : {totalTransactionValue}</h1>
          <hr />
          <h2 className='text-center'>Income : {totalIncomeValue}</h2>
          <h2 className='text-center'>Expense : {totalExpenseValue}</h2>
          <div className='mt-5 '>
            <Progress
              type='circle'
              percent={Number(IncomeValuePercent.toFixed())}
              className='m-5'
            />
            <Progress
              type='circle'
              percent={Number(ExpenseValuePercent.toFixed())}
              strokeColor='red'
              className='m-5'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
