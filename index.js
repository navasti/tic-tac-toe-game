const fieldsElements = document.querySelectorAll('.board__item');
const panel = document.querySelector('.panel');
const resetBtn = document.querySelector('.reset-button');

const fields = ['', '', '', '', '', '', '', '', ''];

let activePlayer = 'X';
let gameEnded = false;

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

const displayGameResult = () => {
   panel.innerText = `Congratulations ${activePlayer}, you won!`;
}

const validateGame = () => {
   for (let i = 0; i <= (winningConditions.length - 1); i++) {
      const [posA, posB, posC] = winningConditions[i];
      const posAValue = fields[posA];
      const posBValue = fields[posB];
      const posCValue = fields[posC];
      if (posAValue !== "" && posAValue === posBValue && posAValue === posCValue) {
         gameEnded = true;
         displayGameResult();
      }
   }
};

fieldsElements.forEach(field => {
   field.addEventListener('click', e => {
      const { pos } = e.target.dataset;
      if (!gameEnded && fields[pos] === '') {
         fields[pos] = activePlayer;
         e.target.classList.add(`board__item--filled-${activePlayer}`);
         validateGame();
         activePlayer = activePlayer === 'X' ? 'O' : 'X';
      }
   })
});