// ACCESSING THE DOM OBJ
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO ==> FIRST TURN PLAYER O

//PATTERN OF POSSIBLE WINNIG
const winPatterns = [ //2D ARRAY
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7], 
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
// RESET GAME FUNCTION
const resetGame = () =>{
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

//adding eventListener
boxes.forEach((box)=>{
  box.addEventListener("click", ()=> {
    
    if(turnO){  //playerO
      box.innerText = "O";// If it's O's turn, put O
      turnO=false;// If it's O's turn, put O
    }
    else{//playerX
      box.innerText = "X";// If it's X's turn, put X
      turnO=true;// Next turn will be O
    }
    box.disabled = true;// Once a box is clicked, disable it

    checkWinner();// Check if someone has won
  });
});
//This disables all boxes (used when someone wins):
const disableBoxes = () =>{
  for(let box of boxes){
    box.disabled = true;
  }
};
const enableBoxes = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText= "";// Clear the box
  }
};

const showWinner = (Winner)=>{
  msg.innerText=`Congratulations,winner is ${Winner}`;// Show winner text
  msgContainer.classList.remove("hide"); // Unhide the message
  disableBoxes();// Stop the game
};
const noWinner = (Winner)=>{
  msg.innerText="Oops! No Winner Game is draw";// Show winner text
  msgContainer.classList.remove("hide"); // Unhide the message
  disableBoxes();// Stop the game
};

// const checkWinner = ()=>{
//   for(let pattern of winPatterns){
//     // console.log(
//     //   pattern[0], 
//     //   pattern[1], 
//     //   pattern[2],
//     // );
//     // console.log(
//     //   boxes [pattern[0]], 
//     //   boxes [pattern[1]], 
//     //   boxes [pattern[2]],
//     // );
//     // console.log(
//     //   boxes [pattern[0]].innerText,
//     //   boxes [pattern[1]].innerText, 
//     //   boxes [pattern[2]].innerText,
//     // );
//     let pos1Val = boxes[pattern[0]].innerText;
//     let pos2Val = boxes[pattern[1]].innerText;
//     let pos3Val = boxes[pattern[2]].innerText;

//     if(pos1Val!== "" && pos2Val!== "" && pos3Val !==""){
//         if(pos1Val===pos2Val && pos2Val === pos3Val){
//          showWinner(pos1Val);
//         }
    
//     }
//     // else if( pos1Val!== "" && pos2Val!== "" && pos3Val !=="") {
//     //   if(pos1Val !==pos2Val || pos2Val || pos3Val || pos3Val|| pos1Val){
//     // noWinner();
//     //   }
//     };
      
    
   
//   };

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      winnerFound = true;
      return; // Exit the function as we found a winner
    }
  }

  // If all boxes are filled and no winner is found, it's a draw
  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (!winnerFound && allFilled) {
    noWinner();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);