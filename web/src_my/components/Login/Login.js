import React, {useState, Component} from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Register from "./Register"
async function loginUser(credentials) {
    return fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json()).catch(data=>"some user")
   }


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken({user:"Arul", token: "token"});
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
    </div>)
  }


Login.propTypes = {
    setToken: PropTypes.func.isRequired
};