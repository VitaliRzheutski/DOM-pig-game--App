

let gamePlaying, lastDice;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1.random number
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;

        //2.Display the result
        document.getElementById('dice-1').style.display = 'block'
        document.getElementById('dice-2').style.display = 'block'
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';                

        //3/Update the round score IF the rolled number was not a 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //nextPalyer
            nextPlayer()
        }
        // if (dice === 6 && lastDice === 6) {
        //     //PLayer looses score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();

        // } else if (dice !== 1) {
        //     //Add score
        //     roundScore += dice;
        //     document.querySelector("#current-" + activePlayer).textContent = roundScore;
        // } else {
        //     //nextPalyer
        //     nextPlayer()
        // }
        // lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL scope
        scores[activePlayer] += roundScore

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        let winningScore;
        let input = document.querySelector('.final-score').value;
         
        if(input){
            winningScore = input;
        }else{
            winningScore = 100;
        }



        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none'
            document.getElementById('dice-2').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //nextPLayer
            nextPlayer()
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector(".btn-new").addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none'
    document.getElementById('dice-2').style.display = 'none'

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLayer 1';
    document.getElementById('name-1').textContent = 'PLayer 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}