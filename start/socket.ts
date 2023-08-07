import Ws from "App/Service/Ws"
Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('my other event', (data) => {
    console.log(data)
  })
})