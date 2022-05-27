//  all spaces start off empty
//  check which players turn it is
//  if they click on a column with available space
//  the lowest available space in that column will change to their color


//INITIALIZE VARIABLES
const reset = document.getElementById('reset')
const column0 = document.getElementById('0');
const column1 = document.getElementById('1');
const column2 = document.getElementById('2');
const column3 = document.getElementById('3');
const column4 = document.getElementById('4');
const column5 = document.getElementById('5');
const column6 = document.getElementById('6');
let playerRed = true
let currentPlayer = "Player 1"
//ARRANGE COLUMNS INTO ARRAY FORMAT FOR THE createGrid function
const columnArr = [column0,column1,column2,column3,column4,column5,column6];

//this function creates a grid where the tokens will live on the gameboard; it will have a class of ".gridTile" for styling purposes
//it will have a class of "c0r0", indicating column 0 row 0 (where column ranges 0-6, and row ranges 0-5), for purposes of appending the token in the right location
//the data attributes can be used for win checking? I think.  Maybe delete those;  
function createGrid(){
  columnArr.forEach((column,index)=>{
    for(let i=0;i<6;i++){
      const gridTile = document.createElement('div');
      gridTile.classList.add('gridTile',`c${index}r${i}`)
      gridTile.setAttribute('data-columns',index);
      gridTile.setAttribute('data-rows',i)
      column.appendChild(gridTile)
    }
  })
}

createGrid();//run function to create grid system (where the tokens can be placed)
 


//each array represents a column; 0 is empty, 1 is red, 2 is yellow; the 0th index of each inner array represents the top of that column;
//this is sort of counter-intuitive to think through because the board is rotate 90 degrees and reflected; e.g. gameBoard[6][0] represents the top right of the board;
let gameBoard = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]


//CREATE EVENT LISTENERS
//On column elements so user can click a column to add a token 
column0.addEventListener('click', () => {
  createToken(0);
});
column1.addEventListener('click', () => {
  createToken(1);
});
column2.addEventListener('click', () => {
  createToken(2);
});
column3.addEventListener('click', () => {
  createToken(3);
});
column4.addEventListener('click', () => {
  createToken(4);
});
column5.addEventListener('click', () => {
  createToken(5);
});
column6.addEventListener('click', () => {
  createToken(6);
});
//reset button event listener
reset.addEventListener('click',()=>{
  resetBoard();
})






function createToken(column) {
  //
  console.log(`Column ${column} has been clicked`)
  // Check if the column has space for a new token
  if (gameBoard[column][0] === 0) {
    // Add token to data
    // Check if it's red's turn
    if (playerRed) {
      //It's red's turn
      redTurn(column)
    }else {
      //It's yellow's turn
      yellowTurn(column)
    }
  }console.log(gameBoard)
}
  
function redTurn(column) {
  //find the last instance of 0 in the column's array, and replace it with 1 for red;
  let index = gameBoard[column].lastIndexOf(0);
  gameBoard[column][index] = 1;
  updateBoard(column,index);
  playerRed = false;
  setTimeout(()=>{
    if(checkWinner(gameBoard)){
    alert('Red Wins!')
    }
  },1000)
}
  
function yellowTurn(column) {
  //find the last instance of 0 in the column's array, and replace it with 2 for yellow;
  let index = gameBoard[column].lastIndexOf(0);
  gameBoard[column][index] = 2;
  updateBoard(column,index);
  playerRed = true;
  //used a SetTimeout to the DOM has a second to update the tokens before declaring a winner
  setTimeout(()=>{
    if(checkWinner(gameBoard)){
    alert('Yellow Wins!')
    }
  },1000)
}
  


//this function will run inside of yellowTurn() or redTurn();  it will create the token and assign its color, depending on whose turn it is;
//that token is then rendered in the DOM
function updateBoard(column,row){
  const token = document.createElement('div');
  token.classList.add('token');
  if(playerRed){
    token.classList.add("redToken")
  } else {
    token.classList.add("yellowToken")
  }
  
  document.querySelector(`.c${column}r${row}`).appendChild(token);  
  
}




// function updateCurrentPlayer(currentPlayer){
//   if (currentPlayer == "Player 1"){
//     currentPlayer = "Player 2"
//     document.querySelector(".currentPlayer").innerText = currentPlayer
//   }else{
//     currentPlayer = "Player 1"
//     document.querySelector(".currentPlayer").innerText = currentPlayer
//   }
// }


//resets Board array; Defaults to red's turn; deletes all tokens from DOM
function resetBoard(){ 
  gameBoard = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
  playerRed = true;
  document.querySelectorAll(".gridTile").forEach(element=>{
    element.innerHTML = '';
  })
  
}


function chkLine(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}


//I'm pretty sure this captures all one conditions.  It's just a reworking of the solution found here: https://stackoverflow.com/questions/33181356/connect-four-game-checking-for-wins-js
function checkWinner(bd) {
    // check vertical
    for (let c = 0; c < 7; c++){
      for (let r = 0; r < 3; r++){
        if (chkLine(gameBoard[c][r], gameBoard[c][r+1], gameBoard[c][r+2], gameBoard[c][r+3])){
          return true;
        };
      }
            
    }
  //check horizontal
    for (let c = 0; c < 4; c++){
      for (let r = 0; r < 6; r++){
        if (chkLine(gameBoard[c][r], gameBoard[c+1][r], gameBoard[c+2][r], gameBoard[c+3][r])){
          return true;
        };
      }
            
    }  
  //check diagonal sloping down
    for (let c = 0; c < 4; c++){
      for (let r = 0; r < 3; r++){
        if (chkLine(gameBoard[c][r], gameBoard[c+1][r+1], gameBoard[c+2][r+2], gameBoard[c+3][r+3])){
          return true;
        };
      }
            
    }
  //check diagonal sloping up
  for (let c = 0; c < 4; c++){
      for (let r = 3; r < 6; r++){
        if (chkLine(gameBoard[c][r], gameBoard[c+1][r-1], gameBoard[c+2][r-2], gameBoard[c+3][r-3])){
          return true;
        };
      }
            
    }

    return false;
}