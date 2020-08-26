const fieldsElements = document.querySelectorAll('.board__item');
const panel = document.querySelector('.panel');
const resetBtn = document.querySelector('.reset-button');

let fields, activePlayer, gameEnded;

const winningConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [6, 4, 2]
];

const setDefaults = () => {
   fields = ['', '', '', '', '', '', '', '', ''];
   activePlayer = 'X';
   gameEnded = false;
}
setDefaults();

const displayWinMessage = () => {
   panel.innerText = `Congratulations ${activePlayer}, you won!`;
}

const displayDrawMessage = () => {
   panel.innerText = `Draw!`;
}

const clearMessage = () => {
   panel.innerText = '';
}

const resetBoardClasses = () => {
   fieldsElements.forEach(field => {
      field.classList.remove('board__item--filled-X', 'board__item--filled-O');
   });
}

const isBoardFull = () => {
   return fields.find(field => field === '') === undefined;
}

const validateGame = () => {
   let gameWon = false;
   for (let i = 0; i <= (winningConditions.length - 1); i++) {
      const [posA, posB, posC] = winningConditions[i];
      const posAValue = fields[posA];
      const posBValue = fields[posB];
      const posCValue = fields[posC];
      if (posAValue !== "" && posAValue === posBValue && posAValue === posCValue) {
         gameWon = true;
         break;
      }
   }
   if (gameWon) {
      gameEnded = true;
      displayWinMessage();
   } else if (isBoardFull()) {
      gameEnded = true;
      displayDrawMessage();
   }
};

const handleItemClick = e => {
   const { pos } = e.target.dataset;
   if (!gameEnded && fields[pos] === '') {
      fields[pos] = activePlayer;
      e.target.classList.add(`board__item--filled-${activePlayer}`);
      validateGame();
      activePlayer = activePlayer === 'X' ? 'O' : 'X';
   };
}

const handleButtonClick = () => {
   setDefaults();
   resetBoardClasses();
   clearMessage();
}

fieldsElements.forEach(field => {
   field.addEventListener('click', handleItemClick);
});

resetBtn.addEventListener('click', handleButtonClick)