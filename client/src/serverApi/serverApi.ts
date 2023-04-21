import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { RegisterInterface } from '../interfaces/register';
import { LoginInterface } from '../interfaces/login';
import { TransactionInterface } from '../interfaces/transaction';

type NavigateFunction = (path: string, state?: any) => void;

interface RegistrationError {
  message: string;
}

export const RegisterFunc = async (
  val: RegisterInterface,
  navigate: NavigateFunction
) => {
  try {
    await axios.post('http://localhost:3001/register', val);
    message.success('Registration successful! Redirecting to login');
    navigate('/login');
  } catch (error) {
    const axiosError = error as AxiosError<RegistrationError>;

    if (
      axiosError.response &&
      axiosError.response.data.message ===
        'Email already in use / registered to the database'
    ) {
      message.error(
        'Registration failed! Email already in use, try a different email!'
      );
    } else {
      message.error('Registration failed!');
    }
  }
};

export const LoginFunc = async (
  val: LoginInterface,
  navigate: NavigateFunction
) => {
  try {
    const res = await axios.post('http://localhost:3001/login', val);
    if (res.data.success) {
      localStorage.setItem('xpensr-user', JSON.stringify(res.data.user));
      localStorage.setItem('xpensr-token', res.data.token);
      message.success('Login succesful!');
      navigate('/');
    } else {
      message.error('Login failed, invalid email or password');
    }
  } catch (error) {
    message.error('Login failed,invalid email or password');
  }
};

export const TransactionFunc = async (val: TransactionInterface) => {
  try {
    //first get the token
    const token = localStorage.getItem('xpensr-token');
    //add the authorization (like in postman header)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //checking all headers, double checking in postman
    console.log('Headers', headers);

    const res = await axios.post('http://localhost:3001/add-transaction', val, {
      //add header here to ensure Authorization: Bearer with token is added every time you add a transaction, so that the transaction is not forbidden or unauthorised
      headers,
    });
    message.success('Transaction logged successfully');
  } catch (error) {
    message.error('Transaction could not be logged');
  }
};
