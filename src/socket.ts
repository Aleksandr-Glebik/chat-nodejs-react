import io from 'socket.io-client'

const socket = io()

// const socket = io('http://api.localhost:8080', {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// })

export default socket