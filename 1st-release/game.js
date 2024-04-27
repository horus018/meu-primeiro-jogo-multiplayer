//FACTORY
export default function createGame() {

    const currentPlayerId = 'player1'

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            w(player){
                if(player.y - 1 >= 0){
                    player.y = player.y - 1
                }
            },
            d(player){
                if(player.x + 1 < state.screen.width){
                    player.x = player.x + 1
                }
            },
            s(player){
                if(player.y + 1 < state.screen.height){
                    player.y = player.y + 1
                }
            },
            a(player){
                if(player.x - 1 >= 0){
                    player.x = player.x - 1
                }
            }
        }

        const player = state.players[currentPlayerId]
        const keyPressed = command.keyPressed
        const moveFunction = acceptedMoves[keyPressed]
        const playerId = command.playerId

        if(player && moveFunction){
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
        return
    }

    function checkForFruitCollision(playerId){
        const player = state.players[playerId]

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]
            console.log(`Checking ${playerId} and ${fruitId}`)

            if(player.x === fruit.x && player.y === fruit.y){
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId })
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}