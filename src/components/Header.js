import { AppBar, Box, IconButton, Menu, MenuItem, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import cardContext from '../context/cardContext';
import SearchBar from './SearchBar';
// import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const contentsSearchIcon = ['foods', 'drinks'];

const LinkMenu = styled(Link)({ textDecoration: 'none', color: 'orangered' })

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
    <AppBar className="container">
      <Box display="flex" justifyContent="space-between" padding={1} alignItems="center" className="header">
      <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => setOpen(true)}>
          <MenuIcon/>
        </IconButton>
        <Menu
        sx={{ mt: 4 }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <LinkMenu  to="/drinks">
          <MenuItem>Drinks</MenuItem>
        </LinkMenu>
        <LinkMenu to="/foods">
          <MenuItem>Foods</MenuItem>
        </LinkMenu>
      </Menu>
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
          </IconButton>
        )}
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
