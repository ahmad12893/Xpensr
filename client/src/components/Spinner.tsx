import React from 'react';
import { CircularProgress } from '@material-ui/core';

function Spinner() {
  return (
    <div
      className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center'
      style={{ zIndex: 9999 }}
    >
      <CircularProgress />
    </div>
  );
}

export default Spinner;
