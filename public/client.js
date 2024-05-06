import createKeyboardListener from "./keyboard-listener.js"
import createGame from "./game.js"
import renderScreen from "./render-screen.js"

const game = createGame()
const keyboardListener = createKeyboardListener(document)

const socket = io()

socket.on('connect', () => {
    const playerId = socket.id
    console.log(`> Player connected on Client with id: ${playerId}`)

    const screen = $('#screen').get(0)
    renderScreen(screen, game, requestAnimationFrame, playerId)
})

socket.on('setup', (state) => {
    const playerId = socket.id
    game.setState(state)
    
    keyboardListener.registerPlayerId(playerId)
    keyboardListener.subscribe(game.movePlayer)
    keyboardListener.subscribe((command) => {
        socket.emit('move-player', command)
    })
})

socket.on('add-player', (command) => {
    game.addPlayer(command)
})

socket.on('remove-player', (command) => {
    game.removePlayer(command)
})

socket.on('move-player', (command) => {
    const playerId = socket.id

    if (command.playerId !== playerId) {
        game.movePlayer(command)
    }
})

socket.on('add-fruit', (command) => {
    game.addFruit(command)
})

socket.on('remove-fruit', (command) => {
    game.removeFruit(command)
})