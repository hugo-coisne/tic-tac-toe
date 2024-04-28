const game = (function () {
  const a = " ";
  const gameboard = [
    [a, a, a],
    [a, a, a],
    [a, a, a],
  ];

  const players = [];

  let turn = 0;

  const logBoard = function () {
    for (let i = 0; i < 3; i++) {
      console.log(gameboard[i]);
    }
  }

  const logPlayers = function () {
    const size = players.length;
    if ( size > 0) {
      console.log("player(s) : ");
      for (let i = 0; i < size; i++) {
        const p = players[i];
        var string = " - " + p.getName() + " : char = " + p.getChar() + ", score = " + p.getScore() + ", winner = " + p.isWinner();

        if (players[i] == players[turn]) {
          string += " (turn to play)";
        }
        console.log(string);
      }
    } else {
      console.log("no players yet");
    }
  }

  const logGame = function () {
    logBoard();
    logPlayers();
  };

  const place = function (player, x, y) {
    if (this.isOver()) {
      throw new Error(`The game is over !`);
    }
    if (!this.getPlayers().includes(player)) {
      throw new Error(`${this.name} is not part of the game !`);
    }
    if (this.getTurnPlayer() != player) {
      throw new Error(`It is ${this.getTurnPlayer().getName()}'s turn, not ${player.getName()}'s !`);
    }
    if (x > 2 || y > 2 || x < 0 || y < 0) {
      throw new Error(
        `x and y coordinates must be within the [0,2] range. (${x},${y})`
      );
    }
    if (gameboard[y][x] != " ") {
      throw new Error(`The (${x},${y}) slot already is taken.`);
    }
    gameboard[y][x] = player.getChar();
    console.log(`${player.getName()} has placed at (${x},${y})`);
    logBoard();
    if (this.checkWin()) {
      player.setWinner();
      console.log(`${player.getName()} wins !`);
      logPlayers();
      return;
    }
    nextPlayer();
  };

  const checkWin = function () {
    //chatgpt generated
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (
        gameboard[i][0] === gameboard[i][1] &&
        gameboard[i][1] === gameboard[i][2] &&
        gameboard[i][2] != a
      ) {
        // console.log("row win");
        return true;
      }
      // Check columns
      if (
        gameboard[0][i] === gameboard[1][i] &&
        gameboard[1][i] === gameboard[2][i] &&
        gameboard[2][i] != a
      ) {
        // console.log("column win");
        return true;
      }
    }

    // Check diagonals
    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2] &&
      gameboard[2][2] != a
    ) {
      // console.log("diagonal win");
      return true;
    }
    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0] &&
      gameboard[2][0] != a
    ) {
      // console.log("diagonal win");
      return true;
    }

    // No win condition found
    return false;
  };

  const addPlayer = function (player) {
    if (this.getPlayers().length >1) {
      throw new Error("the game is full");
    }
    players[turn] = player;
    console.log(`${player.getName()} has been added to the game !`);
    nextPlayer();
  };

  const nextPlayer = function () {
    turn = (turn + 1) % 2;
  };

  const getTurnPlayer = function () {
    return players[turn];
  };

  const getPlayers = function () {
    return players;
  };

  const isOver = function () {
    if(this.getPlayers().length<2){
      throw new Error("game has not started yet");
    }
    return players[0].isWinner() || players[1].isWinner();
  };

  return {
    logGame,
    logBoard,
    logPlayers,
    place,
    checkWin,
    addPlayer,
    getTurnPlayer,
    getPlayers,
    isOver
  };
})();

const createPlayer = function (name, char) {
  const score = 0;
  let winner = false;
  const getScore = function () {
    return score;
  };
  const setWinner = function () {
    winner = true;
  };
  const isWinner = function () {
    return winner;
  };
  const place = function (x, y) {
    game.place(this, x, y);
  };
  const getName = () => name;
  const getChar = () => char;

  const player = { getScore, place, getName, isWinner, getChar, setWinner };
  return player;
};
