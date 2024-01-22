const gameboard = (function () {
  const game = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const logGame = function () {
    console.log(game);
  };

  const place = function (char, x, y) {
    if (x > 2 || y > 2 || x<0 || y<0) {
      throw new Error(`Les coordonées doivent être comprises entre 0 et 2 inclus. (${x},${y})`)
    }
    if (game[y][x] == "") {
      game[y][x] = char;
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
        game[i][2]
      ) {
        return true;
      }
      // Check columns
      if (
        game[0][i] === game[1][i] &&
        game[1][i] === game[2][i] &&
        game[2][i]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (game[0][0] === game[1][1] && game[1][1] === game[2][2] && game[2][2]) {
      return true;
    }
    if (game[0][2] === game[1][1] && game[1][1] === game[2][0] && game[2][0]) {
      return true;
    }

    // No win condition found
    return false;
  };

  return { logGame, place, checkWin };
})();

const createPlayer = function (name, char) {
  const score = 0;
  const getScore = function () {
    return score;
  };
  const place = function (x, y) {
    gameboard.place(char, x, y);
  };
  const getName = () => name;
  return { getScore, place, getName };
};

gameboard.logGame();
gameboard.place("x", 0, 1);
gameboard.place("x", 0, 2);
gameboard.place("x", 0, 0);
gameboard.logGame();
console.log(gameboard.checkWin());
