let oScore = 0;
let xScore = 0;
const oScorePara = document.querySelector("#o-score");
const xScorePara = document.querySelector("#x-score");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let compBtn = document.querySelector("#comp-btn");

let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let countX = 0;
let countO = 0;
let scoreX = document.querySelector("#score1");
let scoreO = document.querySelector("#score2");
let isAi = false;

// turn is play X and player O
let turn0 = true; // player0 ko turn

// use 2D arrays for combinations and patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// reset game
const resetGame = () => {
  console.log("game reset");
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// new game
const newGame = () => {
  console.log("new game");
  turn0 = true;
  enableBoxes();
  oScore = 0;
  oScorePara.innerText = oScore;
  xScore = 0;
  xScorePara.innerText = xScore;

  msgContainer.classList.add("hide");
};

// add event listener for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (isAi) {
      vsComp();
    } else {
      if (turn0) {
        box.innerText = "O";
        turn0 = false;
      } else {
        box.innerText = "X";
        turn0 = true;
      }
      box.disabled = true;

      checkWinner();
    }
    // box.style.backgroundColor = 'yellow';
    // box.style.transform = 'rotateX(360deg)';
    // // box.style.transition = 'all 1s';
    // box.style.transition = 'transform 0.4s';
  });
});

// msgContainer.classList.add('hide');
console.log(boxes);
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  console.log(msg);
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  // msgContainer.style.transition = 'all 1s';
  disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern);
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                if (pos1Val == "X") {
                xScore++;
                xScorePara.innerText = xScore;
                } else {
                oScore++;
                oScorePara.innerText = oScore;
                }
            }
        }
    }

};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);

function vsComp() {
  // Function for the computer's move
  const computerMove = () => {
    let availableBoxes = [];
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].innerText === "") {
        availableBoxes.push(i);
      }
    }

    if (availableBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableBoxes.length);
      const selectedBox = availableBoxes[randomIndex];
      boxes[selectedBox].innerText = "X"; // Computer plays 'X'
      boxes[selectedBox].disabled = true;
      turn0 = true; // Set turn back to the player after the computer's move
    //   checkWinner();
    }
  };

  // Modify the box click event listener to handle Human vs Computer
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0 && box.innerText === "") {
        box.innerText = "O"; // Human plays 'O'
        box.disabled = true;
        checkWinner();
        turn0 = false;
        computerMove(); // Call the function for computer's move
      }
    });
  });
}

// Add event listener for Human vs Computer button
compBtn.addEventListener("click", () => {
    isAi = true;
    newGame();
});
