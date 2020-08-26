class Board {
   panel = document.querySelector('.panel');
   resetBtn = document.querySelector('.reset-button');
   fieldsElements = document.querySelectorAll('.board__item');

   constructor(onItemClick, onButtonClick) {
      this.onButtonClick = onButtonClick;
      this.resetBtn.addEventListener('click', this.handleButtonClick);
      this.fieldsElements.forEach(field => field.addEventListener('click', onItemClick));
   };

   handleButtonClick = () => {
      this.onButtonClick();
      this.resetBoardClasses();
      this.clearMessage();
   };

   resetBoardClasses = () => {
      this.fieldsElements.forEach(field => field.classList.remove('board__item--filled-X', 'board__item--filled-O'));
   };

   displayWinMessage = (activePlayer) => this.panel.innerText = `Congratulations ${activePlayer}, you won!`;

   displayDrawMessage = () => this.panel.innerText = `Draw!`;

   clearMessage = () => this.panel.innerText = '';
};