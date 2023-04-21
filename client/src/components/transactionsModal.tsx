import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { TransactionInterface } from '../interfaces/transaction';
import { TransactionPostFunc } from '../serverApi/serverApi';
import { TransactionsModalProps } from '../interfaces/transactionModalProps';

function TransactionsModal({
  transactionModal,
  setTransactionModal,
  handleAddedTransaction,
}: TransactionsModalProps) {
  //loading for spinner component
  const [loading, setLoading] = useState(false);

  //need to create Transaction interface and transaction function for api

  const onFinish = async (values: TransactionInterface) => {
    try {
      //setLoading to true when logging in so spinner shows
      setLoading(true);
      //use setTimeout to simulate a loading phase
      setTimeout(
        async () => {
          //execute login when the timer runs fully
          await TransactionPostFunc(values);
          handleAddedTransaction(values);
          //stop loading when timer is done
          setLoading(false);
        }, //add a function to simulate random loading for a couple seconds
        Math.floor(Math.random() * 2000) + 1000
      );
    } catch (error) {
      //if an error occurs, need to stop loading/spinner animation
      setLoading(false);
    }
  };

  return (
    <Modal
      title='Add Transaction'
      open={transactionModal}
      onCancel={() => setTransactionModal(false)}
      footer={false}
    >
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item label='Amount' name='amount'>
          <Input type='text' />
        </Form.Item>

        <Form.Item label='Type' name='type'>
          <Select>
            <Select.Option value='Income'>Income</Select.Option>
            <Select.Option value='Expense'>Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Category' name='category'>
          <Select>
            <Select.Option value='Salary'>Salary</Select.Option>
            <Select.Option value='Food'>Food</Select.Option>
            <Select.Option value='Entertainment'>Entertainment</Select.Option>
            <Select.Option value='Travel'>Travel</Select.Option>
            <Select.Option value='Investment'>Investment</Select.Option>
            <Select.Option value='Short-Term Loan'>
              Short-Term Loan
            </Select.Option>
            <Select.Option value='Long-Term Loan'>Long-Term Loan</Select.Option>
            <Select.Option value='Miscellaneous'>Miscellaneous</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Date' name='date'>
          <Input type='date' />
        </Form.Item>

        <Form.Item label='Reference' name='reference'>
          <Input type='text' />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input type='text' />
        </Form.Item>

        <div className='flex justify-end'>
          <button className='bg-blue-500 text-white p-5 py-2 font-semibold rounded-xl'>
            Add
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TransactionsModal;
