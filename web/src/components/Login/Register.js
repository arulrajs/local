import React from 'react';
import { TextField, Button, Box} from "@mui/material";

export default function Register({ setRegister, setMessage }) {
  var err = undefined
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    var object = {};
    if (err !== undefined){
      setMessage(err);
      err = undefined;
      return false;
    }
    formData.forEach((value, key) => {
      if(value === ""){
        err = "Value missing for "+key
      }else if(key === "phone" && value.length <10 ){
        err = "Enter valid phone number"
      }else if(value.length <6){
        err = "User name, password must be more than 6 char len"
      }
      if (err !== undefined){
        setMessage(err);
      }else{
        object[key] = value
      }
      
    });
    if (err === undefined){
      const userData = await registerUser(object);
      if(userData){
        setRegister(false);
      }
    }else{
      return false
    }
  }

  async function registerUser(userData) {
    return fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(res => {
      if(res.status >= 400) {
        res.text().then(text => { 
          console.log(text) 
          setMessage(JSON.parse(text).error);
        })          
          return false
      }
      setMessage("User registration successful");
      return res.json();
    })
  }

  return(
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone"
        name="phone"
        autoComplete="phone"
        type="number"
        autoFocus
        error={err}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        error={err}
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
        error={err}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        
      >
       Register
      </Button>
      <Button
        type="cancel"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={(e)=>{e.preventDefault();setRegister(false);}}
      >
        Cancel
      </Button>
    </Box>    
  )
}
