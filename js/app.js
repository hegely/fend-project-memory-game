/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector('.deck');
let card = deck.querySelectorAll('li');
let cards = document.querySelectorAll('.card');
let openCards = [];
let numMatches = 0;
let moves = document.querySelector('.moves');
let numMoves = 0;
let numStars = 3;
let star1 = document.querySelector('#star1');
let star2 = document.querySelector('#star2');
let star3 = document.querySelector('#star3');
let restart = document.querySelector('.restart');
let playAgain = document.querySelector('#play-again');
let score = document.querySelector('#score');
let timer = document.querySelector('#timer');
let minutesLabel = document.querySelector('#minutes');
let secondsLabel = document.querySelector('#seconds');
let time = document.querySelector("#time");
let totalSeconds = 0;
let Interval = setInterval;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */ 
displayCards();
 
function displayCards() {
	let cardsArray = [];
	cardsArray = Array.from(cards);
    cardsArray = shuffle(cardsArray);
    deck.innerHTML = '';
 	 	
 	cardsArray.forEach(function(card) {
		card.classList.remove('match', 'open', 'show');
		deck.appendChild(card);
 	 	});
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)--
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)--
 *  - if the list already has another card, check to see if the two cards match--
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)--
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)--
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)--
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)--
 */

//event listener for a card - if a card is clicked
card.forEach(function(e) {
    e.addEventListener('click', showCard);
});

//display the card's symbol
function showCard(e) {
	
	//define targetElement and ensure that it will be li element
	let targetElement = e.target;
	
	if (targetElement.classList.contains('fa')) {
		targetElement = targetElement.parentElement;
	}

	//display the card's symbol, add the card to a *list* of 'open' cards
	if (openCards.length < 2) {
		targetElement.classList.add('open', 'show');
		openCards.push(targetElement);
	};
    
	//if the list already has another card, check to see if the two cards match
    if (openCards.length == 2) {

		//prevent same card to be clicked again
		let firstID = openCards[0].getAttribute('id');
        let secondID = openCards[1].getAttribute('id');
        if (firstID == secondID) {
            openCards.pop();
        } else {
        
			//compare two cards
			let firstCard = openCards[0].childNodes[1].className;
			let secondCard = openCards[1].childNodes[1].className;
			if (firstCard == secondCard) {
				matchYes();
			} else {
				matchNo();
			}
			
			//increment the move counter
			addMove();
			
				if (numMoves == 1) {
					Interval = setInterval(setTime, 1000);
				}
				
			//increment the star rating
			addStar();
			
		}
    }
}

function addMove () {
	
    numMoves++;
    moves.textContent = numMoves;

};

function addStar () {
	
    if (numMoves >= 10 && numMoves < 20) {
        star3.classList.remove('fa-star'); 
		star3.classList.add('fa-star-o');
		numStars = 2;
    } 
    if (numMoves >= 20 && numMoves < 30) {
        star2.classList.remove('fa-star'); 
		star2.classList.add('fa-star-o');
		numStars = 1;
    }
    if (numMoves >= 30) {
		numStars = 1;
    }
	
};

function matchNo () {
	
	//if the cards do not match, remove the cards from the list and hide the card's symbol
	setTimeout (function () {
		if (openCards.length > 1) {
			openCards[0].classList.remove('open', 'show');
			openCards[1].classList.remove('open', 'show');
		}		
		openCards = [];
	}, 750);
	
};

function matchYes () {
	
	//if the cards do match, lock the cards in the open position
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = [];
    numMatches++;

    if (numMatches == 8) {
		numMoves++;
		callWin();
    }
};

//restart the game
restart.addEventListener('click', restartGame);

function restartGame() {
	
    displayCards();
    openCards = [];
    numMoves = 0;
	numStars = 3;
	moves.textContent = numMoves;
    numMatches = 0;
    star2.classList.remove('fa-star-o'); 
	star2.classList.add('fa-star'); 
    star3.classList.remove('fa-star-o'); 
	star3.classList.add('fa-star');
	clearInterval(Interval);
	totalSeconds = 0;
    secondsLabel.innerText = '00';
    minutesLabel.innerText = '00';
	
};

function callWin () {
	clearInterval(Interval);
    win.style.display = 'block';
    score.textContent = 'With ' + numMoves + ' Moves and ' +  numStars + ' Stars'
	time.innerHTML = 'Elapsed time: ' + minutesLabel.innerHTML + ':' +  secondsLabel.innerHTML;
}

//play again
playAgain.addEventListener('click', startOver);

function startOver () {
    restartGame();
    win.style.display = 'none';
}

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}