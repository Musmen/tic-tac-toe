class TicTacToe {

  constructor() {
    this.MATRIX_SIZE = 3;

    this._matrix = [ [null, null, null],
                     [null, null, null],
                     [null, null, null] ];
    
    this._currentPlayerSymbol = 'x';
  }

  changeCurrentPlayerSymbol() {
    var CURRENT_TO_NEXT = {
     'x': 'o',
     'o': 'x'
    };

    this._currentPlayerSymbol = CURRENT_TO_NEXT[this.getCurrentPlayerSymbol()];
  }

  getCurrentPlayerSymbol() {
    return this._currentPlayerSymbol;
  }

  getFieldValue(rowIndex, colIndex) {
    return this._matrix[rowIndex][colIndex];
  }

  nextTurn(rowIndex, columnIndex) {
    if (this.getFieldValue(rowIndex, columnIndex)) return -1;
    this._matrix[rowIndex][columnIndex] = this._currentPlayerSymbol;
    this.changeCurrentPlayerSymbol();
  }

  getColumn(columnIndex) {  // Get column set of matrix (my own method, not required)
    var column = [];
    for (var i = 0; i < this.MATRIX_SIZE; i++) {
      column.push(this._matrix[i][columnIndex]);
    }
    return column.join('');
  }

  getWinner() {
    var WINNER_X_SET = new Array(this.MATRIX_SIZE).fill('x').join('');
    var WINNER_O_SET = new Array(this.MATRIX_SIZE).fill('o').join('');
    var game_set = [];
    
    var rows = [];  // Sets of matrix after the game, which potential include winners sets
    var columns = [];
    var diagonal = [];
    var diagonal_reverse = [];

    for (var i = 0; i < this.MATRIX_SIZE; i++) {
        rows.push(this._matrix[i].join(''));
        columns.push(this.getColumn(i));
        diagonal.push(this._matrix[i][i]);
        diagonal_reverse.push(this._matrix[i][this.MATRIX_SIZE - i - 1]);
    }

    game_set = game_set.concat(rows).concat(columns).concat(diagonal.join('')).concat(diagonal_reverse.join(''));

    if (game_set.includes(WINNER_X_SET)) {
        return 'x';
    } else if (game_set.includes(WINNER_O_SET)) {
        return 'o';
    } else return null;
  }

  isDraw() {
    return this.noMoreTurns() && !this.getWinner();
  }

  isFinished() {
    return !!(this.getWinner()) || this.noMoreTurns();
  }

  noMoreTurns() {
    return !(this._matrix.map(
      function(item) {
          return item.includes(null);
      }
    ).includes(true));
  }
}

module.exports = TicTacToe;