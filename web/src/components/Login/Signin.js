import React, {useState,} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Register from "./Register"
const theme = createTheme();

export default function SignIn({setToken}) {

    const [register, setRegister] = useState();
    const [message, setMessage] = useState();

    async function loginUser(credentials) {
        return fetch('/api/user/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(response => {
            if(response.status === 200){
                setMessage("Login success")
                console.log(response.headers)
                return {"token":response.headers.get('auth-token'), 
                                   "user":response.headers.get('auth-user')}
                                   
            }else{
                setMessage("User login failed")
            }
        })
          
       }
       
    const handleSubmit = async e => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const auth = await loginUser({
        phone: data.get('phone'),
        password: data.get('password')
      });
      console.log(auth)
      if(auth !== undefined){
        localStorage.setItem('auth-token', auth['token']);
        localStorage.setItem('auth-user', auth['user']);
        setToken(auth);
      } 
    };
  
    const handleRegister = async e => {
      e.preventDefault();
      setRegister(true);
    };


  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            padding:2,
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {register ? <Register setRegister={setRegister} setMessage={setMessage}></Register>:
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type='number'
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleRegister}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>}
        </Box>
        <Snackbar
        open={message}
        autoHideDuration={5000}
        message={message}
        onClose={()=>{setMessage(undefined)}}
      />
    </ThemeProvider>
  );
}