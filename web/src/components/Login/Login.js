import React, {useState, Component} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Register from "./Register"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
          console.log(response.headers)
          return {"token":response.headers.get('auth-token'), 
                               "user":response.headers.get('auth-user')}
        }
        })
      .catch(toast.error("User login failed"))
   }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const auth = await loginUser({
      username,
      password
    });
    console.log(auth)
    if(auth !== undefined){
      localStorage.setItem('auth-token', auth['token']);
      localStorage.setItem('auth-user', auth['user']);
      setToken(auth);
    } 
  }

  const handleRegister = async e => {
    e.preventDefault();
    setRegister(true);
  }
  
  return(
    <div>
    {register ? <Register setRegister={setRegister}></Register>:
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <form onSubmit={handleSubmit} >
        <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} required/>
        </label>
        <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}  required/>
        </label>
        <div style={{paddingTop:'10px', paddingLeft:'10px', alignItems:"right", paddingLeft:"0%"}}>
            <button id="register" onClick={handleRegister}>Register</button>
            <span style={{width:"100px"}} ></span>
            <button id="login" type='submit'>Login</button>
        </div>
        </form>
    </div>}
    <ToastContainer/>
    </div>)
  }


Login.propTypes = {
    setToken: PropTypes.func.isRequired
};