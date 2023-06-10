import React, {useState} from 'react';
import './Dashboard.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MainDetails from '../main/Main';
export default function Dashboard({userData}) {
  const [tabIndex, setTabIndex] = useState(0);
  return(
    <MainDetails chats={[{"people":[{"person":{"username":"some","avatar":"http://something"} ,"last_read":123},{"person":{"username":"some1","avatar":"http://something"} ,"last_read":123}]},
      {"people":[{"person":{"username":"some1","avatar":"http://something"},"last_read":123}]}]} 
      activeChat={1} 
      userName={userData['user']} 
    />
  );
}

