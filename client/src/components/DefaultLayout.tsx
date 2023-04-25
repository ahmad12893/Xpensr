import React, { useEffect, useState } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Button } from '@mui/material';
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';
import Profile from '../pages/Profile';
function DefaultLayout(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const userJSON = localStorage.getItem('xpensr-user');
  const user =
    userJSON && userJSON !== 'undefined' ? JSON.parse(userJSON) : null;

  useEffect(() => {
    if (!userJSON) {
      navigate('/login');
    }
  }, []);

  // console.log('User --->', user);
  /*
  -maintain color schema for background for consistency
  -have logo visible on top, as well as the buttons to take you to other parts of app
  -clicking logo should take you to home
  -use MUI to create popup button when clicked
  -underneath buttoon and logo/header, have the props as children which will be home/profile/logout
  -delete key token and user from localstorage when logging out, and go back to front page
  */
  return (
    <div className='flex flex-col m-0 w-screen h-screen content-between bg-gradient-to-t from-teal-300 to-indigo-600'>
      <div className='flex justify-between items-center text-3xl  ml-4 md:ml-8 text-white p-2 md:p-4 rounded-bl-xl rounded-br-xl text-opacity-50'>
        <div className='text-sm md:text-base'>
          <h1
            className='cursor-pointer text-3xl'
            onClick={() => setShowProfile(false)}
          >
            XPENSR
          </h1>
        </div>
        <div className='text-sm md:text-base p-3 w-[10%]'>
          <PopupState variant='popover' popupId='demo-popup-menu'>
            {(popupState) => (
              <>
                {user && (
                  <Button
                    key={user._id}
                    variant='contained'
                    {...bindTrigger(popupState)}
                  >
                    {user.name}
                  </Button>
                )}
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => setShowProfile(true)}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem('xpensr-user');
                      localStorage.removeItem('xpensr-token');
                      navigate('/login');
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </div>
      </div>
      <div className='flex self-center h-[100vh] border-none rounded-t-xl w-[95vw] mt-5 p-3 text-xl bg-white hover:shadow-2xl transition duration-500 opacity-95 hover:opacity-100 overflow-scroll'>
        {showProfile ? <Profile /> : props.children}
      </div>
    </div>
  );
}

export default DefaultLayout;
