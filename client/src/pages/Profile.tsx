import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { TransactionInterface } from '../interfaces/transaction';
import { useContext } from 'react';
import { TransactionContext } from '../components/TransactionContext';

function Profile() {
  const { transactions } = useContext(TransactionContext);

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
  const tiltDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltDiv.current) {
      VanillaTilt.init(tiltDiv.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }
  }, []);
  // const totalTransactionValue = transactions.reduce(
  //   (acc: number, transaction: TransactionInterface) => {
  //     // console.log('transaction amount:', transaction.amount);
  //     // console.log('acc:', acc);

  //     return acc + +transaction.amount;
  //   },
  //   0
  // );

  // const totalIncomeValue = transactions
  //   .filter((transaction: { type: string }) => transaction.type === 'Income')
  //   .reduce(
  //     (acc: number, transaction: TransactionInterface) =>
  //       acc + +transaction.amount,
  //     0
  //   );
  // const totalExpenseValue = transactions
  //   .filter((transaction: { type: string }) => transaction.type === 'Expense')
  //   .reduce(
  //     (acc: number, transaction: TransactionInterface) =>
  //       acc + +transaction.amount,
  //     0
  //   );

  console.log(transactions);
  return (
    <div className='flex h-full w-full flex-col items-center'>
      <div>
        <p
          className='text-5xl text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl m-10'
          ref={tiltDiv}
        >
          Your Profile Summary
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default Profile;
