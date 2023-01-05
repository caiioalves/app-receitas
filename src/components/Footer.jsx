import { AppBar, IconButton, Link } from '@mui/material';
import React from 'react';
import WineBarIcon from '@mui/icons-material/WineBar';
// import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <AppBar
      color='others'
      position="fixed"
      sx={{
        backdropFilter: 'blur(10px)',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 1 ,
        top: 'auto',
        bottom: 0 
      }}
      data-testid="footer">
      <Link href="/drinks" >
        {/* <img alt="drinks" data-testid="drinks-bottom-btn" src={ drinkIcon } /> */}
        {/* <PersonIcon/> */}
        <IconButton sx={{ marginLeft: 5 }}>
          <WineBarIcon sx={{ fontSize: 40 }}/>
        </IconButton>
      </Link>
      <Link href="/foods">
        {/* <img alt="foods" data-testid="food-bottom-btn" src={ mealIcon } /> */}
        <IconButton sx={{ marginRight: 5 }} >
          <LocalDiningIcon sx={{ fontSize: 40 }}/>
        </IconButton>
      </Link>
      {/* <PersonIcon/> */}
    </AppBar>
  );
}

export default Footer;
