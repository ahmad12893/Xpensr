import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { TransactionInterface } from '../interfaces/transaction';
import { useContext } from 'react';
import { TransactionContext } from '../components/TransactionContext';
import axios from 'axios';

//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
function Profile() {
  const { transactions } = useContext(TransactionContext);
  const [storeResponse, setStoreResponse] = useState('');
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

  const tiltDiv1 = useRef<HTMLDivElement>(null);
  const tiltDiv2 = useRef<HTMLDivElement>(null);
  const tiltDiv3 = useRef<HTMLDivElement>(null);
  const tiltDiv4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltDiv1.current) {
      VanillaTilt.init(tiltDiv1.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }

    if (tiltDiv2.current) {
      VanillaTilt.init(tiltDiv2.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }

    if (tiltDiv3.current) {
      VanillaTilt.init(tiltDiv3.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }

    if (tiltDiv4.current) {
      VanillaTilt.init(tiltDiv4.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    }
  }, []);
  const totalTransactionValue = transactions.reduce(
    (acc: number, transaction: TransactionInterface) => {
      // console.log('transaction amount:', transaction.amount);
      // console.log('acc:', acc);

      return acc + +transaction.amount;
    },
    0
  );

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
  const categoryTotalSpent = categories.map((category) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === 'Expense' && transaction.category === category
      )
      .reduce(
        (acc: any, transaction: any) => acc + parseFloat(transaction.amount),
        0
      )
      .toFixed(0);
  });

  const categoryTotalEarned = categories.map((category) => {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === 'Income' && transaction.category === category
      )
      .reduce(
        (acc: any, transaction: any) => acc + parseFloat(transaction.amount),
        0
      )
      .toFixed(0);
  });
  // console.log(
  //   `You are a financial advisor with over 50 years of experience, your name is Xpensr (pronounced Spencer) and you will give me financial advice based on the general spending information given to you.
  //   My total transactional value is ${totalTransactionValue}, and my income from these transactions is ${totalIncomeValue}, my expense from these transactions is ${totalExpenseValue}.
  //   For spending, the categories are ${categories} and spending for each of the aforementioned categories was  ${categoryTotalSpent}, and for income, the categories are the same, but the spending was ${categoryTotalEarned}. Please give me good financial advice using the information given.`
  // );
  const fetchData = async () => {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: `You are a financial advisor with over 50 years of experience, your name is Xpensr (pronounced Spencer) and you will give me financial advice based on the general spending information given to you.My total transactional value is ${totalTransactionValue}, and my income from these transactions is ${totalIncomeValue}, my expense from these transactions is ${totalExpenseValue}.For spending, the categories are ${categories} and spending for each of the aforementioned categories was  ${categoryTotalSpent}, and for income, the categories are the same, but the spending was ${categoryTotalEarned}. Please give me detailed financial advice using the information given, make it as detailed as possible .`,
        model: 'text-davinci-003',
        max_tokens: 800,
        n: 1,
        stop: '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );
    return response.data.choices[0].text;
  };

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData();
      setStoreResponse(res);
      return res;
    };
    getData();
  }, []);

  return (
    <div className='flex h-screen w-screen flex-col items-center animate-fade-in'>
      <div>
        <p
          className='text-5xl text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl mt-20 hover:bg-gray-200 text-center'
          ref={tiltDiv1}
        >
          Your Profile Summary
        </p>
        <p
          className='text-3xl  text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl m-10 text-center hover:bg-gray-200'
          ref={tiltDiv2}
        >
          Total Transactional Value: {totalTransactionValue}
        </p>

        <div
          className='text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl m-5 text-center hover:bg-gray-200'
          ref={tiltDiv3}
        >
          <div className='mt-5'>
            <p className='text-3xl mb-5'>Total Earnings: {totalIncomeValue}</p>
            <p className='text-xl'>Earnings by Category:</p>
            {categories.map((category, index) => {
              const categoryTotal = transactions
                .filter(
                  (transaction) =>
                    transaction.type === 'Income' &&
                    transaction.category === category
                )
                .reduce(
                  (acc: any, transaction: any) =>
                    acc + parseFloat(transaction.amount),
                  0
                )
                .toFixed(0);

              return (
                <p key={index} className='text-lg'>
                  {category}: {categoryTotal}
                </p>
              );
            })}
          </div>
        </div>
        <div
          className='text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl m-5 text-center hover:bg-gray-200'
          ref={tiltDiv4}
        >
          <p className='text-3xl'>Total Spendings : {totalExpenseValue}</p>
          <div className='mt-5'>
            <p className='text-xl'>Earnings by Category:</p>
            {categories.map((category, index) => {
              const categoryTotal = transactions
                .filter(
                  (transaction) =>
                    transaction.type === 'Expense' &&
                    transaction.category === category
                )
                .reduce(
                  (acc: any, transaction: any) =>
                    acc + parseFloat(transaction.amount),
                  0
                )
                .toFixed(0);

              return (
                <p key={index} className='text-lg'>
                  {category}: {categoryTotal}
                </p>
              );
            })}
          </div>
        </div>
        <div className='text-gray-500 opacity-50 hover:opacity-100 transition duration-300 hover:shadow-2xl border border-gray p-10 rounded-2xl m-5 text-center hover:bg-gray-200 pb-10 h-[500px]'>
          <p>{storeResponse}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
