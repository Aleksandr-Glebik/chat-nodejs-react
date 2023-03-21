import React, { useState } from 'react'
import socket from '../socket';
import axios from 'axios'

type JoinBlockType = {
  onLogin: () => void
}

const JoinBlock: React.FC<JoinBlockType> = ({onLogin}) => {
  const [roomId, setRoomId] = useState('')
  const [nameChat, setNameChat] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async () => {
    if (!roomId || !nameChat) {
      return alert('Заполните оба поля')
    }
    setLoading(true)
    await axios.post('/rooms', {
      roomId,
      nameChat
    }).then( () => {
      onLogin()
    })
    // console.log('roomId', roomId)
    // console.log('nameChat', nameChat)
  }

  return (
    <div className='join-block'>
        <input
          type="text"
          placeholder='Room ID'
          className="input"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          type="text"
          placeholder='Ваше имя'
          className="input"
          value={nameChat}
          onChange={(e) => setNameChat(e.target.value)}
        />
        <button
          className='btn btn-success'
          onClick={onEnter}
          disabled={isLoading}
        >
          {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
        </button>
      </div>
  )
}

export default JoinBlock
