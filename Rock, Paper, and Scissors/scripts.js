let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const userScorePara = document.querySelector('#user-score');
const compScorePara = document.querySelector('#computer-score');

const msg = document.querySelector('#msg');

const genCompChoice = () => {
    const options = ['rock', 'paper', 'scissors'];

    const randIndex = Math.floor(Math.random() * 3);
    //multiplied by 3 cuz initially 0 to 1 thyo range random ko, aba 0 to 2 huni vo

    return options[randIndex];
}

const drawGame = () => {
    console.log('The game is draw');
    msg.innerText = 'Intense! Game was draw.';
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        console.log('You win');
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice}, a wonderful move against ${compChoice}.` 
    }
    else{
        console.log('You lose');
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! Your ${userChoice} were weak against their  ${compChoice}.`
    }
}


const playGame = (userChoice) => {
    // user choice
    console.log('User Choice is ', userChoice);

    // generate computer choice
    const compChoice = genCompChoice();
    console.log('Computer Choice is ', compChoice);


    if(userChoice === compChoice){
        // draw game
        drawGame();
    }

    else{

        let userWin = true;

        if(userChoice === 'rock'){
            // paper, scissors
            userWin = compChoice === 'paper' ? false : true;
        }
        else if (userChoice === 'paper'){
            // scissors, rock
            userWin = compChoice === 'scissors' ? false : true;
        }
        else {
            // rock, paper
            userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}


choices.forEach((choice)=>{
    // console.log(choice);
    
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice);
        // console.log('choice was clicked', userChoice);
        playGame(userChoice);
    });

});


// // Create a MediaQueryList object
// var x = window.matchMedia("(max-width: 1000px)");
// // Call listener function at run time
// myFunction(x);
// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         showWinner = (userWin, userChoice, compChoice) => {
//             if(userWin){
//                 console.log('You win');
//                 userScore++;
//                 userScorePara.innerText = userScore;
//                 msg.innerText = `You win!`;
//             }
//             else{
//                 console.log('You lose');
//                 compScore++;
//                 compScorePara.innerText = compScore;
//                 msg.innerText = `You lose!`;
//             }
//       }
//     }
// };
  