import { AppBar, Box, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';
import SearchBar from './SearchBar';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const contentsSearchIcon = ['foods', 'drinks'];

function Header(props) {
  const [searchIcon, setSearchIcon] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const { setType } = useContext(cardContext);
  const [title, setTitle] = useState('');
  const { location: { pathname }, history } = props;

  useEffect(() => {
    const path = pathname.replace('/', '').replace('-', ' ');
    if (contentsSearchIcon.includes(path)) {
      setSearchIcon(true);
      setType(path);
    }
    const titleNew = path.toLowerCase().split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    setTitle(titleNew);
  }, [pathname, setType]);

  return (
    <AppBar
      // sx={{ borderBottomRightRadius: 50, borderBottomLeftRadius: 50 }}
      className="container">
      <Box display="flex" justifyContent="space-between" padding={1} alignItems="center" className="header">
        <IconButton
          className="button"
          type="button"
          onClick={ () => { history.push('/profile'); } }
          data-testid="btn-profile"
        >
          <PersonIcon/>
          {/* <Avatar
            className="img"
            src={ profile }
            alt=""
            data-testid="profile-top-btn"
          /> */}
        </IconButton>
        <Typography variant="h5" fontWeight="bold" data-testid="page-title">{title}</Typography>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" >
        { searchIcon && (
          <IconButton
            className="button"
            type="button"
            onClick={ () => { setShowSearch((prev) => !prev); } }
            data-testid="btn-search"
          >
            <SearchIcon/>
            {/* <Avatar
              className="img"
              src={ search }
              alt=""
              data-testid="search-top-btn"
            /> */}
          </IconButton>
        )}
        <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => setOpen(true)}>
          <MenuIcon/>
        </IconButton>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link href="/drinks">
          <MenuItem>Drinks</MenuItem>
        </Link>
        <Link href="/foods">
          <MenuItem>Foods</MenuItem>
        </Link>
        {/* <MenuItem>Logout</MenuItem> */}
      </Menu>
        </Box>
      </Box>
      { showSearch && <SearchBar history={ history } /> }
    </AppBar>
  );
}

Header.propTypes = {
  history: PropTypes.shape,
  location: PropTypes.shape,
}.isRequired;

export default Header;
