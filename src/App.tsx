import React, { useEffect, useReducer } from 'react';
import './App.css';
import Chat from './components/Chat';
import JoinBlock, {ObjType} from './components/JoinBlock';
import reducer from './reducer';
import { EnumType } from './reducer';
import socket from './socket';
import axios from 'axios';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
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
    setUsers(data.users)
  }

  const setUsers = (users: string[]) => {
    dispatch({
      type: EnumType.SET_USERS,
      payload: users
    })
  }

  useEffect( () => {
    // socket.on('ROOM:JOINED', setUsers)
    socket.on('ROOM:SET_USERS', setUsers)
  }, [])

  console.log('state', state)

  return (
    <div className="wrapper">
      {!state.joined
        ? <JoinBlock onLogin={onLogin} />
        : <Chat {...state} />
      }
    </div>
  );
}

export default App;
