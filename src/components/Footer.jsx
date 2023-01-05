import { Box, IconButton, Link } from '@mui/material';
import React from 'react';
import WineBarIcon from '@mui/icons-material/WineBar';
// import { Link } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Box
      bgcolor='#F27457'
      position="fixed"
      sx={{
        // backdropFilter: 'blur(10px)',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        display: { xs: 'flex', md: 'none' },
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        // padding: 1 ,
        // width: '50%',
        width: '90%',
        top: 'auto',
        bottom: 0,
        boxShadow: '0px -1px 5px black'
      }}
      data-testid="footer">
      <Link href="/drinks" >
        {/* <img alt="drinks" data-testid="drinks-bottom-btn" src={ drinkIcon } /> */}
        {/* <PersonIcon/> */}
        <IconButton sx={{ marginLeft: 5 }}>
          <WineBarIcon/>
        </IconButton>
      </Link>
      <Link href="/foods">
        {/* <img alt="foods" data-testid="food-bottom-btn" src={ mealIcon } /> */}
        <IconButton sx={{ marginRight: 5 }} >
          <LocalDiningIcon/>
        </IconButton>
      </Link>
      {/* <PersonIcon/> */}
    </Box>
  );
}

export default Footer;
