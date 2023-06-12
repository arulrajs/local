import React from 'react';
import './Dashboard.css';
import ChatFeed from '../chat/ChatFeed';


export default function Dashboard({userData}) {
  return(
    <div>
        <ChatFeed chats={[{"people":[{"person":{"username":"some","avatar":"http://something"} ,"last_read":123},{"person":{"username":"some1","avatar":"http://something"} ,"last_read":123}]},
        {"people":[{"person":{"username":"some1","avatar":"http://something"},"last_read":123}]}]} 
        activeChat={1} 
        userName={'some'} 
        messages={[{"sender":{"username":"some",},"text":"shops near me","message":{"text":"testsdfsdfssdfds"},  "id":123},
        {"sender":{"username":"some1",},"text":"Natraj store, Sam bakers..","message":{"text":"testsdfsf"}, "id":123}]}/>
    </div>
  );
}