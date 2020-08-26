class Game {
   fields;
   gameEnded;
   activePlayer;

   winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
   ];

   constructor() {
      this.setDefaults();
      this.board = new Board(this.handleItemClick, this.handleButtonClick);
   };

   setDefaults = () => {
      this.fields = ['', '', '', '', '', '', '', '', ''];
      this.activePlayer = 'X';
      this.gameEnded = false;
   };

   isBoardFull = () => this.fields.find(field => field === '') === undefined;

   handleItemClick = e => {
      const { pos } = e.target.dataset;

      if (!this.gameEnded && this.fields[pos] === '') {
         this.fields[pos] = this.activePlayer;
         e.target.classList.add(`board__item--filled-${this.activePlayer}`);
         this.validateGame();
         this.activePlayer = this.activePlayer === 'X' ? 'O' : 'X';
      };
   };

   handleButtonClick = () => {
      this.setDefaults();
   };

   validateGame = () => {
      let gameWon = false;
      for (let i = 0; i <= (this.winningConditions.length - 1); i++) {
         const [posA, posB, posC] = this.winningConditions[i];
         const posAValue = this.fields[posA];
         const posBValue = this.fields[posB];
         const posCValue = this.fields[posC];
         if (posAValue !== "" && posAValue === posBValue && posAValue === posCValue) {
            gameWon = true;
            break;
         };
      };
      if (gameWon) {
         this.gameEnded = true;
         this.board.displayWinMessage(this.activePlayer);
      } else if (this.isBoardFull()) {
         this.gameEnded = true;
         this.board.displayDrawMessage();
      };
   };
};