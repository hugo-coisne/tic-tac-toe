const gameboard = (function () {
    const game = [['', '', ''], ['', '', ''], ['', '', '']]
    const logGame = function(){
        console.log(game)
    }
    const place = function (char, x, y) {
        if (game[y][x] == '') {
            game[y][x] = char
        } else {
            throw new Error(`The (${x},${y}) slot already is taken.`)
        }
    }

    return {logGame, place}
})();

gameboard.logGame()
gameboard.place('x', 1, 0)
gameboard.logGame()