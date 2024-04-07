const gameboard = (function () {
  const a = " ";
  const game = [
    [a, a, a],
    [a, a, a],
    [a, a, a],
  ];

  const players = [];

  let turn = 0;

  const logGame = function () {
    for (let i = 0; i < 3; i++) {
      console.log(game[i]);
    }
    if (players.length > 0) {
      console.log("player(s) : ");
      for (let i = 0; i < this.getPlayers().length; i++) {
        var string = " - " + players[i].getName();
      if (players[i] == players[turn]) {
          string += " (turn to play)";
        }
        console.log(string);
      }
    } else {
      console.log("no players yet");
      }
  };

  const place = function (char, x, y) {
    if (x > 2 || y > 2 || x < 0 || y < 0) {
      throw new Error(
        `Les coordonées doivent être comprises entre 0 et 2 inclus. (${x},${y})`
      );
    }
    if (game[y][x] == " ") {
      game[y][x] = char;
      nextPlayer();
    } else {
      throw new Error(`The (${x},${y}) slot already is taken.`);
    }
  };

  const checkWin = function () {
    //chatgpt generated
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (
        game[i][0] === game[i][1] &&
        game[i][1] === game[i][2] &&
        game[i][2] != a
      ) {
        console.log("row win");
        return true;
      }
      // Check columns
      if (
        game[0][i] === game[1][i] &&
        game[1][i] === game[2][i] &&
        game[2][i] != a
      ) {
        console.log("column win");
        return true;
      }
    }

    // Check diagonals
    if (
      game[0][0] === game[1][1] &&
      game[1][1] === game[2][2] &&
      game[2][2] != a
    ) {
      console.log("diagonal win");
      return true;
    }
    if (
      game[0][2] === game[1][1] &&
      game[1][1] === game[2][0] &&
      game[2][0] != a
    ) {
      console.log("diagonal win");
      return true;
    }

    // No win condition found
    return false;
  };

  const addPlayer = function (player) {
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
    return players[0].isWinner() || players[1].isWinner();
  };

  return {
    logGame,
    place,
    checkWin,
    addPlayer,
    getTurnPlayer,
    getPlayers,
    isOver,
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
    if (gameboard.isOver()) {
      return;
    }
    if (gameboard.getTurnPlayer() == this) {
      gameboard.place(char, x, y);
      console.log(`${this.getName()} has placed `);
      if (gameboard.checkWin()) {
        setWinner();
        console.log(`${name} wins !`);
      }
    } else {
      throw new Error(`It is ${gameboard.getTurnPlayer().getName()}'s turn !`);
    }
  };
  const getName = () => name;
  const player = { getScore, place, getName, isWinner };
  gameboard.addPlayer(player);
  return player;
};
