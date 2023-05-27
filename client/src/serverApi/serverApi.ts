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
    if (val.password !== val.confirmPassword) {
      message.error('Passwords do not match, please try again');
      return;
    } else
      await axios.post('https://react-crud-s7nd.onrender.com/register', val);
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
    const res = await axios.post(
      'https://react-crud-s7nd.onrender.com/login',
      val
    );
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

export const TransactionPostFunc = async (val: TransactionInterface) => {
  try {
    //first get the token
    const token = localStorage.getItem('xpensr-token');
    //add the authorization (like in postman header)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //checking all headers, double checking in postman
    // console.log('Headers', headers);

    const res = await axios.post(
      'https://react-crud-s7nd.onrender.com/add-transaction',
      val,
      {
        //add header here to ensure Authorization: Bearer with token is added every time you add a transaction, so that the transaction is not forbidden or unauthorised
        headers,
      }
    );
    message.success('Transaction logged successfully');
    return res.data; //resolve promise
  } catch (error) {
    message.error('Transaction could not be logged');
  }
};

export const TransactionGetFunc = async (
  days: string, //pass the days as a argument, because it will always exist i.e. 10 days default
  type: string,
  category: string,
  selectedRange: [string, string] //pass range as a optional argument, only if the user selects a custom range
) => {
  // console.log('TransactionGetFunc called with:', {
  //   days,
  //   selectedRange,
  // });
  try {
    //first get the token
    const token = localStorage.getItem('xpensr-token');

    //here we define the query, using URLSearchParmas, which was advised by da bois, IDK how this thing works, but apparently it basically handles query parameters like days which i have in my backend, I need the transactions of the last 10 days, which is the default, in my Home.tsx
    const query = new URLSearchParams({ days, type, category });
    // console.log(selectedRange);
    if (days === 'custom') {
      query.set('startDate', selectedRange[0]); //if a range of 2 dates is selected, set startdate to feed backed
      query.set('endDate', selectedRange[1]); //if a range of 2 dates is selected, set endDate to feed backend
    }

    //add the authorization (like in postman header)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //checking all headers, double checking in postman
    // console.log('Headers', headers);

    const res = await axios.get(
      'https://react-crud-s7nd.onrender.com/get-all-transactions',
      {
        //add header here to ensure Authorization: Bearer with token is added every time you add a transaction, so that the transaction is not forbidden or unauthorised
        headers,
        params: query, //fetch the parameters that match new URLSearchParams({ days });
      }
    );
    return res.data;
    //message getting in way of login message, removed
  } catch (error) {
    console.log(error);
  }
};

export const TransactionEditFunc = async (val: TransactionInterface) => {
  try {
    // console.log(val);
    //first get the token
    const token = localStorage.getItem('xpensr-token');
    //add the authorization (like in postman header)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //checking all headers, double checking in postman
    // console.log('Headers', headers);

    const res = await axios.put(
      `https://react-crud-s7nd.onrender.com/edit-transaction/${val._id}`, //requires val._id for transaction ID to update
      val,
      {
        //add header here to ensure Authorization: Bearer with token is added every time you add a transaction, so that the transaction is not forbidden or unauthorised
        headers,
      }
    );
    message.success('Transaction edited successfully');
  } catch (error) {
    message.error('Transaction could not be edited');
  }
};

export const TransactionDeleteFunc = async (val: TransactionInterface) => {
  try {
    // console.log(val);
    // console.log(val);
    //first get the token
    const token = localStorage.getItem('xpensr-token');
    //add the authorization (like in postman header)
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    //checking all headers, double checking in postman
    // console.log('Headers', headers);

    const res = await axios.delete(
      `https://react-crud-s7nd.onrender.com/delete-transaction/${val._id}`, //requires val._id for transaction ID to update
      {
        //add header here to ensure Authorization: Bearer with token is added every time you add a transaction, so that the transaction is not forbidden or unauthorised
        headers,
      }
    );
    message.success('Transaction deleted successfully');
  } catch (error) {
    message.error('Transaction could not be deleted');
  }
};
