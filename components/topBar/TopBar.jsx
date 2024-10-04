import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { withRouter } from 'react-router-dom';
import FetchModel from '../../lib/fetchModelData';

function TopBar(props) {
  const [version, setVersion] = useState('');

  useEffect(() => {
    // Fetch the version number from the server
    FetchModel('http://localhost:3000/test/info')
      .then((response) => {
        const versionNumber = response.data.load_date_time;
        setVersion(versionNumber);
      })
      .catch((error) => {
        console.error('Error fetching version number:', error);
      });
  }, []);

  const pathname = props.location.pathname;
  // Extracting the user name from the pathname (if applicable)
  const userId = pathname.includes('/users/')
    ? pathname.split('/users/')[1]
    : null;
  const photo = pathname.includes('/photos/')
    ? pathname.split('/photos/')[1]
    : null;

  return (
    <AppBar className='topbar-appBar' position='absolute'>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' color='inherit'>
          G3
        </Typography>
        <Typography variant='h5' color='inherit'>
          {userId
            ? `Details of ${window.models.userModel(userId).first_name}`
            : photo
            ? `Photos of ${window.models.userModel(photo).first_name}`
            : ''}
        </Typography>
        <Typography variant='body2' color='inherit'>
          Version: {version}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(TopBar);
