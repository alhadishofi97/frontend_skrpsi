import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Grid,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
  Alert,
  useMediaQuery
} from '@mui/material';

// material-ui imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// Mocking the login API response for this example
const BASE_URL = import.meta.env.VITE_APP_API_URL;


export const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard/default',{replace:true});  // Adjust the route as needed
    }
  },[])  


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const loginData = { username, password };

    // console.log(loginData);

    try {
      const response = await fetch(BASE_URL + '/api/users/login', {  // Perbaiki di sini
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Login successful, navigate to the dashboard or home
        localStorage.setItem('token', data.token);
        localStorage.setItem('menu-items', JSON.stringify(data.authority)); // Simpan sebagai string JSON
        localStorage.setItem('username', loginData.username);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id_user', data.id_user);

        // window.location.replace('dashboard/default');
        
        // alert('Login berhasil');
        //20241025 
        navigate('/dashboard/default', { replace: true });
        // navigate(0);  // Adjust the route as needed
      } else {
        // Display error message
        setError(data.data || 'Username atau password salah');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={{ xs: 'column-reverse', md: 'row' }} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                            Hi, Selamat Datang
                          </Typography>
                          {/* <Typography variant="caption" fontSize="16px" textAlign={{ xs: 'center', md: 'inherit' }}>
                            Enter your credentials to continue
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <form onSubmit={handleLogin}>
                      <Stack spacing={2}>
                        <TextField
                          label="Username"
                          variant="outlined"
                          fullWidth
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="large"
                        >
                          Login
                        </Button>
                      </Stack>
                    </form>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      {/* <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Don&apos;t have an account?
                      </Typography> */}
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
