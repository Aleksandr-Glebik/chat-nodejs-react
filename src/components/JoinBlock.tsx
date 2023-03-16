import React from 'react'
import socket from '../socket';

const JoinBlock = () => {
  return (
    <div className='join-block'>
        <input type="text" placeholder='Room ID' className="input" />
        <input type="text" placeholder='Ваше имя' className="input"/>
        <button className='btn btn-success'> ВОЙТИ</button>
      </div>
  )
}

export default JoinBlock
