import express from 'express'
import http from 'http'
import createGame from './public/game.js'

const app = express()
const server = http.createServer(app)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addFruit({fruitId: 'fruit1', fruitX: 1, fruitY: 2})

game.movePlayer({playerId: 'player1', keyPressed: 's'})

console.log(game.state)

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})