import React, { useState } from 'react'
import axios from 'axios'

export type ObjType = {
  roomId: string
  userName: string
}

type JoinBlockType = {
  onLogin: (obj: ObjType) => void
}

const JoinBlock: React.FC<JoinBlockType> = ({onLogin}) => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setLoading] = useState(false)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Заполните оба поля')
    }
    const obj = {
      roomId,
      userName
    }
    setLoading(true)
    await axios.post('/rooms', obj)
    onLogin(obj)
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
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
