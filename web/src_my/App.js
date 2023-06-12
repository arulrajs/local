import React, {useState} from 'react';

import './App.css';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';

function App(){
  const [token, setToken] = useState();
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
        <Dashboard userData={token}/>
  );
}

export default App;