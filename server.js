import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import { Server } from 'socket.io';

const app = express()
const server = http.createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer({playerId: playerId})
    // console.log(game.state)

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({playerId: playerId})
        console.log(`> Player disconnected: ${playerId}`)
    })
})



server.listen(3000, () => {
    console.log('> Server is running on port 3000')
})