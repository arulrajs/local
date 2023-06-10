import React, {useState} from 'react';

import './App.css';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';

function App(){
  const [tokenData, setToken] = useState();
  if(!tokenData) {
    return <Login setToken={setToken} />
  }
  return (
        <Dashboard userData={tokenData}/>
  );
}

export default App;