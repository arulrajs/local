import './Chat.css'
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import { useState } from 'react';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  var [msges, setMsges] = useState(messages);
  const chat = chats && chats[activeChat];


  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(msges);

    return keys.map((key, index) => {
      const message = msges[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={msges[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  const updateChat = (message) => {
    setMsges(oldArray => [...oldArray, message]);
    const msg = {"sender":{"username":"some1",},"text":"Found 10 results ..","id":123}
    setTimeout(() => {setMsges(oldArray => [...oldArray, msg])}, 5000)
  }

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} onChat={updateChat}/>
      </div>
    </div>
  );
};

export default ChatFeed;