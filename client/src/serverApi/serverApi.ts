import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { Register } from '../interfaces/register';
import { LoginInterface } from '../interfaces/login';

type NavigateFunction = (path: string, state?: any) => void;

interface RegistrationError {
  message: string;
}

export const RegisterFunc = async (val: Register) => {
  try {
    await axios.post('http://localhost:3001/register', val);
    message.success('Registration successful!');
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
