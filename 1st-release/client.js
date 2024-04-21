const screen = $('#screen').get(0)
const context = screen.getContext('2d')
const currentPlayerId = 'player1'

const game = {
    players: {
        'player1': { x: 1, y: 1 },
        'player2': { x: 9, y: 9 },
    },
    fruits: {
        'fruit1': { x: 3, y: 1 }
    }
}

document.addEventListener('keydown', handleKeydown)

function handleKeydown(event) {
    const player = game.players[currentPlayerId]

    if(event.key === 'w'){
        player.y = player.y - 1
        return
    }

    if(event.key === 'a'){
        player.x = player.x - 1
        return
    }

    if(event.key === 's'){
        player.y = player.y + 1
        return
    }

    if(event.key === 'd'){
        player.x = player.x + 1
        return
    }
}

renderScreen()

function renderScreen() {
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.players) {
        const player = game.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    requestAnimationFrame(renderScreen);

}