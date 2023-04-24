import React, { useState } from 'react';
import { Modal, Form, Input, Select, Radio, RadioChangeEvent } from 'antd';
import { TransactionInterface } from '../interfaces/transaction';
import {
  TransactionEditFunc,
  TransactionPostFunc,
} from '../serverApi/serverApi';
import { TransactionsModalProps } from '../interfaces/transactionModalProps';

function TransactionsModal({
  transactionModal,
  setTransactionModal,
  handleAddedTransaction,
  editTransaction,
  setEditTransaction,
  handleEditedTransaction,
}: TransactionsModalProps) {
  //loading for spinner component
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('Income');
  const options = ['Income', 'Expense'];

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio1 checked', value);
    setValue(value);
  };

  //need to create Transaction interface and transaction function for api

  const onFinish = async (values: TransactionInterface) => {
    try {
      //setLoading to true when logging in so spinner shows
      setLoading(true);
      //use setTimeout to simulate a loading phase
      setTimeout(
        async () => {
          //execute login when the timer runs fully
          if (editTransaction) {
            const updatedTransactions = { ...editTransaction, ...values };
            await TransactionEditFunc(updatedTransactions);
            handleEditedTransaction({ ...editTransaction, ...values });
            setEditTransaction(null);
          } else {
            await TransactionPostFunc(values);
            handleAddedTransaction(values);
          }
          //close the friggin modal on clicking add and submission
          setTransactionModal(false);
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
  // console.log(editTransaction);

  return (
    <Modal
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      open={transactionModal}
      onCancel={() => setTransactionModal(false)}
      footer={false}
    >
      <Form
        layout='vertical'
        onFinish={onFinish}
        initialValues={editTransaction}
      >
        <Form.Item label='Amount' name='amount'>
          <Input type='text' placeholder='$1000' required />
        </Form.Item>

        <Form.Item label='Type' name='type'>
          <Radio.Group
            optionType='button'
            buttonStyle='solid'
            options={options}
            onChange={onRadioChange}
            value={value}
          >
            Expense
          </Radio.Group>
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
          <Input type='date' required />
        </Form.Item>

        <Form.Item label='Reference' name='reference'>
          <Input type='text' required placeholder='Car Payment' />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input
            type='text'
            required
            placeholder='E.g. Payment made to Ferrari'
          />
        </Form.Item>

        <div className='flex justify-end'>
          <button
            className='bg-blue-500 text-white p-5 py-2 font-semibold rounded-xl'
            type='submit'
            // onClick={() => setTransactionModal(false)}
          >
            Add
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TransactionsModal;
