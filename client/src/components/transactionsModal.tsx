import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

function transactionsModal() {
  //loading for spinner component
  const [loading, setLoading] = useState(false);

  //need to create Transaction interface and transaction function for api
  
  // const onFinish = async (values: ) => {
  //   try {
  //     //setLoading to true when logging in so spinner shows
  //     setLoading(true);
  //     //use setTimeout to simulate a loading phase
  //     setTimeout(
  //       async () => {
  //         //execute login when the timer runs fully
  //         await LoginFunc(values, navigate);
  //         //stop loading when timer is done
  //         setLoading(false);
  //       }, //add a function to simulate random loading for a couple seconds
  //       Math.floor(Math.random() * 2000) + 1000
  //     );
  //   } catch (error) {
  //     //if an error occurs, need to stop loading/spinner animation
  //     setLoading(false);
  //   }
  // };

  return <div>transactionsModal</div>;
}

export default transactionsModal;
