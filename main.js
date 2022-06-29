//Create a Player

let playerName = document.querySelector("#name");
let submitBtn = document.querySelector(".submittion")
let ticTac = document.querySelectorAll('.choicePlayer')
let x = document.querySelector("#x");
let o = document.querySelector("#o");
let mark = '';


const player = (name, mark) => {
    let userName = name;
    let userMark = mark;
    return { userName, userMark }
}

// Handle coice of X or O
const ticTacChoice = (event) => {
    console.log()
    if(event.target.innerHTML == 'X'){
        event.target.style.cssText = "background-color:rgb(40, 191, 161); color:white";
        o.style.cssText = "background-color:white; color:black";
        mark = event.target.innerHTML;

    }
    else{
        event.target.style.cssText = "background-color:rgb(40, 191, 161); color:white";
            x.style.cssText = "background-color:white; color:black";
            mark = event.target.innerHTML;

        }

}

x.addEventListener('click', ticTacChoice);
o.addEventListener('click', ticTacChoice);

submitBtn.addEventListener('click', function newGame(){
    //Handle empty input
    if(playerName.value == ''){
        playerName.placeholder = 'You forgot to introduce yourself!';

        playerName.removeAttribute('id', 'name')
        playerName.setAttribute('id', 'wrongInput');

        setTimeout(()=>{
            playerName.placeholder = 'Enter name...';
            playerName.removeAttribute('id', 'wrongInput')
            playerName.setAttribute('id', 'name');
        }, 3000)
    }
    else{

        let addPlayer = player(playerName.value, mark);
        let playerBoard = Gameboard();
        display(playerBoard.board, addPlayer.userMark, playerBoard.placeMark);
        updateUI();

    }

})

/*Create a gameBoard module */

const Gameboard = (() => {
    let board = ['1','2','3','4','5','6','7','8','9'];

    const placeMark = (index, n, mark) => {
        board.splice(index, n, mark)
    }

    return { board, placeMark }
})

/*Display Gameplay*/

const display = ((board, mark, placeMark) => {

    board.forEach(element => {
        let block = document.createElement('div');
        block.innerText = '';
        document.querySelector('section').appendChild(block);
        block.setAttribute('class', 'boardCell');

        //After click on a block
        block.addEventListener('click', function(){
            placeMark(board.indexOf(element), 1, mark)
            block.innerText = mark;
        })

    });
   
    document.querySelector('section').setAttribute('class', 'board')
});

//Update UI

const updateUI = () => {
    document.querySelector('h3').innerHTML = `Good luck ${playerName.value}!`;
    submitBtn.style.cssText = "display:none";
    //Change submit btn to reset
    let resetBtn = document.createElement('button');
    document.querySelector('#gameHolder').appendChild(resetBtn);
    resetBtn.setAttribute('class', 'submittion');
    resetBtn.innerText = "Reset Game";
    //Remove choice after game has started
    ticTac.forEach(element => 
        element.style.display = "none")
}