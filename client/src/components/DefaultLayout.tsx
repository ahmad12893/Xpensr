import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router';

function DefaultLayout() {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem('xpensr-user');
  const user =
    userJSON && userJSON !== 'undefined' ? JSON.parse(userJSON) : null;

  useEffect(() => {
    if (!userJSON) {
      navigate('/login');
    }
  }, []);

  console.log('User --->', user);

  return <div></div>;
}

export default DefaultLayout;
