import { server } from "./http"
import './websocket/ChatService'

server.listen(3000, () => {
  console.log('🚀 ~ file: server.ts ~ app.listen ~ 3000')
})