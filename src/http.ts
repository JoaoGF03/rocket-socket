import express from 'express'
import { join } from 'node:path'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()

export const server = createServer(app)

app.use(express.static(join(process.cwd(), 'public')))

export const io = new Server(server)

io.on('connection', (socket) => {
  console.log('🚀 ~ file: http.ts ~ line 15 ~ io.on ~ socket', socket.id)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
