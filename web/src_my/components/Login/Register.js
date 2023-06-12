import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

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
          toast.error(JSON.parse(text).error);
        })          
          return false
      }
      toast.success("User registration successful");
      return res.json();
    })
}


export default function Register({ setRegister }) {
  const [username, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const userData = await registerUser({
      username,
      phone,
      mail,
      password
    });
    if(userData){
      setRegister(false);
    }
    
  }

  return(
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <form onSubmit={handleSubmit} >
        <label>
            <p>Username</p>
            <input id="username" type="text" onChange={e => setUserName(e.target.value)}required/>
        </label>
        <label>
            <p>Phone</p>
            <input id="phone" type="number" onChange={e => setPhone(e.target.value)} required/>
        </label>
        <label>
            <p>Mail</p>
            <input id="mail" type="mail" onChange={e => setMail(e.target.value)}/>
        </label>                
        <label>
            <p>Password</p>
            <input id="password" type="password" onChange={e => setPassword(e.target.value)} required/>
        </label>
        <div style={{paddingTop:'10px', alignItems:"right", paddingLeft:"40%"}}>
          <button onClick={()=>setRegister(false)}>Cancel</button>
          <button type="submit">Create</button>
        </div>
        </form>
       <ToastContainer/>
    </div>
  )
}

Register.propTypes = {
  setRegister: PropTypes.func.isRequired
};