import { Box, Button, Card, TextField, ThemeProvider } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tema } from '../components/Tema';
import logo from '../images/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const number6 = 7;

  const validateButton = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <ThemeProvider theme={Tema}>
    <Stack
      bgcolor="#F27457"
      sx={{
        background: 'radial-gradient(circle, rgba(242,116,87,1) 0%, rgba(255,159,28,1) 100%)'
      }}
      alignItems="center" height="100vh" justifyContent="center" className="body">
      <Card
        // elevation={3}
        sx={{
          bgcolor: "#F2F2F2",
          padding: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5%"
        }}
      >
        <Box>
          <img width="70" src={ logo } alt="" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="inputs">
          <TextField
            sx={{ mb: 2, mt: 6}}
            onChange={ handleChangeEmail }
            value={ email }
            type="email"
            className="input"
            data-testid="email-input"
            label="Digite seu email"
          />
          <TextField
            className="input"
            onChange={ handleChangePassword }
            value={ password }
            type="password"
            data-testid="password-input"
            label="Digite sua senha"
          />
        </Box>
        <Button
          sx={{ mt: 5}}
          variant="contained"
          className="enter"
          onClick={ handleClick }
          disabled={ password.length < number6 || !validateButton() }
          data-testid="login-submit-btn"
        >
          Enter
        </Button>
      </Card>
    </Stack>
    </ThemeProvider>
    );
}

export default Login;
