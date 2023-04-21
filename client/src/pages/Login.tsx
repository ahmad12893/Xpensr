import { useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { LoginFunc } from '../serverApi/serverApi';
import { LoginInterface } from '../interfaces/login';
import VanillaTilt from 'vanilla-tilt';

function Login() {
  //for spinner loading animation
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem('xpensr-user') &&
      localStorage.getItem('xpensr-token')
    ) {
      navigate('/');
    }
  });

  //to navigate to home page after a successful login i.e. navigate('/') if successful
  const navigate = useNavigate();

  const onFinish = async (values: LoginInterface) => {
    try {
      //setLoading to true when logging in so spinner shows
      setLoading(true);
      //use setTimeout to simulate a loading phase
      setTimeout(
        async () => {
          //execute login when the timer runs fully
          await LoginFunc(values, navigate);
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

  return (
    <div
      className='h-screen w-100vw flex justify-center items-center
    bg-gradient-to-t from-teal-300 to-indigo-600 p-5
    '
    >
      {loading && <Spinner />}
      <div className='flex flex-row justify-end'>
        <div
          className='h-[350px] w-[400px] bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-none p-6 shadow-xl hover:bg-opacity-20  transition-all duration-500 hover:shadow-2xl mr-12 '
          ref={tiltDiv}
        >
          <h1 className='text-3xl text-white flex justify-center items-center font-semibold'>
            Login
          </h1>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item //email entry
              label={<span className='text-white font-semibold'>E-mail</span>}
              name='email'
            >
              <Input className='bg-transparent border-4 text-white font-semibold' />
            </Form.Item>

            <Form.Item //password entry
              label={<span className='text-white font-semibold'>Password</span>}
              name='password'
            >
              <Input
                className='bg-transparent border-4 text-white'
                type='password'
              />
            </Form.Item>
            <div className='flex justify-between items-center text-indigo-800 flex-col font-semibold'>
              <Link
                to='/register'
                className=' hover:text-indigo-500 hover:underline'
              >
                Haven't Got An Account? Register Here!
              </Link>
              <button className='bg-blue-900 text-white rounded-md mt-5 p-2 hover:bg-indigo-500 transition duration-500 hover:text-black'>
                LOGIN
              </button>
            </div>
          </Form>
        </div>
      </div>
      <div className='' ref={tiltDiv}>
        <lottie-player
          src='https://assets10.lottiefiles.com/private_files/lf30_aXRkcv.json'
          background='transparent'
          speed='1'
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  );
}

export default Login;
