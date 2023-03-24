import React, { useEffect, useReducer } from 'react';
import './App.css';
import Chat from './components/Chat';
import JoinBlock, {ObjType} from './components/JoinBlock';
import reducer from './reducer';
import { EnumType } from './reducer';
import socket from './socket';
import axios from 'axios';

type message = {
  userName: string
  text: string
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: '',
    users: [],
    messages: []
  })

  const onLogin = async (obj: ObjType) => {
    dispatch({
      type: EnumType.JOINED,
      payload: obj,
    })
    socket.emit('ROOM:JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomId}`)
    // setUsers(data.users)
    dispatch({
      type: EnumType.SET_DATA,
      payload: data
    })
  }

  const setUsers = (users: string[]) => {
    dispatch({
      type: EnumType.SET_USERS,
      payload: users
    })
  }

  const addMessage = (message: message) => {
    dispatch({
      type: EnumType.NEW_MESSAGE,
      payload: message,
    })
  }

  useEffect( () => {
    socket.on('ROOM:SET_USERS', setUsers)

    socket.on('ROOM:NEW_MESSAGE', (message: message) => addMessage(message))
  }, [])

  console.log('state', state)

  return (
    <div className="wrapper">
      {!state.joined
        ? <JoinBlock onLogin={onLogin} />
        : <Chat {...state} onAddMessage={addMessage}/>
      }
    </div>
  );
}

export default App;
