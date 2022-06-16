import express from 'express'
import { join } from 'node:path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose, { ConnectOptions } from 'mongoose'

const app = express()

export const server = createServer(app)

//docker run --name mongodb -p 27017:27017 -d -t mongo
mongoose.connect('mongodb://localhost/rocket-socket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions )

app.use(express.static(join(process.cwd(), 'public')))

export const io = new Server(server)

io.on('connection', (socket) => {
  console.log('🚀 ~ file: http.ts ~ line 15 ~ io.on ~ socket', socket.id)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})
