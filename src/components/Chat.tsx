import React from 'react';
// import socket from '../socket';

type ChatPropsType = {
    users: string[]
    messages: string[]
}

const Chat: React.FC<ChatPropsType> = ({ users, messages }) => {
  const [messageValue, setMessageValue] = React.useState('');

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>Название комнаты</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
            {users.map( (name, ind) => (
                <li key={`${name}_${ind}`}>{name}</li>
            ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div  className="messages">
            <p>Lorem, ipsum.</p>
            <div>
                <span>Test user</span>
            </div>
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            ></textarea>
          <button  type="button" className="btn btn-primary">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;