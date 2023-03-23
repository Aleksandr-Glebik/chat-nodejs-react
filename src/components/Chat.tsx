import React, {useRef, useEffect} from 'react';
import socket from '../socket';

type message = {
  userName: string
  text: string
}

type ChatPropsType = {
    users: string[]
    userName: string
    roomId: string | null
    messages: message[] | []
    onAddMessage: (message: message) => void
}

const Chat: React.FC<ChatPropsType> = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = useRef<HTMLDivElement>(null)

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue
    })
    onAddMessage( {userName: userName, text: messageValue} )
    setMessageValue('')
  }

  useEffect( () => {
    messagesRef.current?.scrollTo(0, 999990)
  }, [messages])

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
            {users.map( (name, ind) => (
                <li key={`${name}_${ind}`}>{name}</li>
            ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div className='messages' ref={messagesRef}>
        {messages.map( (message, index) => (
          <div
            key={`${message}_${index}`}
            className="message"
          >
            <p>{message.text}</p>
            <div>
                <span>{message.userName}</span>
            </div>
          </div>
        ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            ></textarea>
          <button
            onClick={onSendMessage}
            type="button"
            className="btn btn-primary"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;