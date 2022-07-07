//Create a Player
let playerName = document.querySelector("#name");
let submitBtn = document.querySelector(".submittion");
let ticTac = document.querySelectorAll('.choicePlayer')
let x = document.querySelector("#x");
let o = document.querySelector("#o");
let mark = '';


const player = (name, mark) => {
    let userName = name;
    let userMark = mark;
    return { userName, userMark }
}

// Handle choice of X or O
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

const newGame = () => {
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

        //Create a new Game and Player
        let addPlayer = player(playerName.value, mark);
        let playerBoard = Gameboard();
        display(playerBoard.board, addPlayer.userMark, playerBoard.replace, playerBoard.isWin);
        updateUI();
    }

}

/*Create a gameBoard module */

const Gameboard = (() => {
    let board = ['1','2','3','4','5','6','7','8','9'];

    const replace = (index, numb, markValue) => {
        board.splice(index, numb, markValue)
    }

    const isWin = () => {

        //Horizontal

        for(let i = 0; i < board.length-1; i += 3){
            if(board[i] == board[i+1] && board[i] == board[i+2]){
                
                return true
            }
        }
        //Vertical
        for(let i = 0; i < board.length-1; i += 1){
            if(board[i] == board[i+3] && board[i] == board[i+6]){
                
                return true
            }
        }
        //Diagonal
        if(board[0] == board[4] && board[0] == board[8]){
            return true
        }
        else if(board[2] == board[4] && board[2] == board[6]){
            return true
        }

        return false

    }

    return { board, replace, isWin }
})


/*Display Gameplay*/

const display = ((board, mark, replace, isWin) => {

    board.forEach(element => {
        let block = document.createElement('div');
        block.innerText = '';
        let section =  document.querySelector('section');
        section.appendChild(block);
        block.setAttribute('class', 'boardCell');

        //After click on a block
        block.addEventListener('click', function() {
            //Replace board array value for marked filed
            replace(board.indexOf(element), 1, mark)

            //Place mark
            block.innerText = mark;

            //Check is winning combination happend
            const winning = isWin();
            if(winning){
                endGame();
            }
        })
    });

    document.querySelector('section').setAttribute('class', 'board')
});

//Update UI

const updateUI = () => {
    document.querySelector('h3').innerHTML = `Good luck ${playerName.value}!`;
    //submitBtn.style.cssText = "display:none";
    changeSubmitToReset();

    //Remove choice after game has started
    ticTac.forEach(element => 
        element.style.display = "none")
}

const cleanFiled = (e) => {
    e.preventDefault();
    //Remove all marks
    let board = document.querySelector('.board');
    for(let i = 0; i < board.children.length; i++){
        board.children[i].innerHTML = '';
    }
}

const changeSubmitToReset = () =>{

    submitBtn.removeEventListener('click', newGame);
    submitBtn.value = "Reset Game";
    submitBtn.addEventListener('click', cleanFiled);

};

const endGame = () =>{
    submitBtn.remove()
    const board = document.querySelector('.board');

    board.remove();

    const congrds = document.createElement('div');
    congrds.innerHTML = "<h1>You won!</h1>"
    congrds.setAttribute('class', 'gameEnd');
    gameHolder.appendChild(congrds);

    setTimeout(() => {
        location.reload();
    }, 1000)


}


x.addEventListener('click', ticTacChoice);
o.addEventListener('click', ticTacChoice);
submitBtn.addEventListener('click', newGame);

