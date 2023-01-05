import { AppBar, Box, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';
import SearchBar from './SearchBar';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

const contentsSearchIcon = ['foods', 'drinks'];

function Header(props) {
  const [searchIcon, setSearchIcon] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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
          <PersonIcon sx={{ fontSize: 35 }}/>
          {/* <Avatar
            className="img"
            src={ profile }
            alt=""
            data-testid="profile-top-btn"
          /> */}
        </IconButton>
        <Typography variant="h4" fontWeight="bold" data-testid="page-title">{title}</Typography>
        { searchIcon && (
          <IconButton
            className="button"
            type="button"
            onClick={ () => { setShowSearch((prev) => !prev); } }
            data-testid="btn-search"
          >
            <SearchIcon sx={{ fontSize: 35 }}/>
            {/* <Avatar
              className="img"
              src={ search }
              alt=""
              data-testid="search-top-btn"
            /> */}
          </IconButton>
        )}
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
