import createKeyboardListener from "./keyboard-listener.js"
import createGame from "./game.js"
import renderScreen from "./render-screen.js"

const game = createGame()
const keyboardListener = createKeyboardListener(document)
keyboardListener.subscribe(game.movePlayer)

const screen = $('#screen').get(0)
renderScreen(screen, game, requestAnimationFrame)

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addFruit({fruitId: 'fruit1', fruitX: 1, fruitY: 2})