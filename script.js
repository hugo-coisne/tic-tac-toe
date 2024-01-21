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
    if (game[y][x] == "") {
      game[y][x] = char;
    } else {
      throw new Error(`The (${x},${y}) slot already is taken.`);
    }
  };

  return { logGame, place };
})();

const createPlayer = function (char) {
  const score = 0;
  const char = char;
  const getScore = function () {
    return score;
  };
  const place = function (x, y) {
    gameboard.place(char, x, y);
  };
  return { getScore, place };
};

gameboard.logGame();
gameboard.place("x", 1, 0);
gameboard.logGame();
