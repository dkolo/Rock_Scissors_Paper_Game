var newGameBtn = document.getElementById("js-newGameButton");

newGameBtn.addEventListener("click", newGame);

var pickRock = document.getElementById("js-playerPick_rock"),
	pickPaper = document.getElementById("js-playerPick_paper"),
	pickScissors = document.getElementById("js-playerPick_scissors");

pickRock.addEventListener("click", function() {
	playerPick("Rock");
});
pickPaper.addEventListener("click", function() {
	playerPick("Paper");
});
pickScissors.addEventListener("click", function() {
	playerPick("Scissors");
});

var gameState = "notStarted", //started // ended
	player = {
		name: "",
		score: 0
	},
	computer = {
    	score: 0
	},
	newGameElem = document.getElementById("js-newGameElement"),
	pickElem = document.getElementById("js-playerPickElement"),
	resultsElem = document.getElementById("js-resultsTableElement");

function setGameElements() {
	switch (gameState) {
		default:
		newGameElem.style.display = "block";
		pickElem.style.display = "none";
		resultsElem.style.display = "none";
	break;
		case "notStarted":
		newGameElem.style.display = "block";
		pickElem.style.display = "none";
		resultsElem.style.display = "none";
	break;
		case "started":
		newGameElem.style.display = "none";
		pickElem.style.display = "block";
		resultsElem.style.display = "block";
	break;
		case "ended":
		newGameBtn.innerText = "Play again";
		newGameElem.style.display = "block"; //Change by me
		pickElem.style.display = "none"; //Change by me
	}
}

var playerPointsElem = document.getElementById("js-playerPoints"),
	playerNameElem = document.getElementById("js-playerName"),
	computerPointsElem = document.getElementById("js-computerPoints");

function newGame() {
	player.name = prompt("Please enter your name", "Imię gracza");
	if (player.name) {
		player.score = computer.score = 0;
		gameState = "started";
		setGameElements();
		playerNameElem.innerHTML = player.name;
	}
}

function getComputerPick() {
	var possiblePicks = ["Rock", "Paper", "Scissors"];
	return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById("js-playerPick"),
	computerPickElem = document.getElementById("js-computerPick"),
	playerResultElem = document.getElementById("js-playerResult"),
	computerResultElem = document.getElementById("js-computerResult");

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = "";

	var winnerIs = "player";

	if (playerPick == computerPick) {
		winnerIs = "noone"; // remis
	} else if (
    	(computerPick == "Rock" && playerPick == "Scissors") ||
    	(computerPick == "Scissors" && playerPick == "Paper") ||
    	(computerPick == "Paper" && playerPick == "Rock")
	) {
		winnerIs = "computer";
	}
  
  	if (winnerIs == "player") {
		playerResultElem.innerHTML = "Wins!";
		player.score++;
	} else if (winnerIs == "computer") {
    	computerResultElem.innerHTML = "Wins!";
    	computer.score++;
	} else if (winnerIs == "noone") { //Added by me
  		playerResultElem.innerHTML = "Draw xD";
    	computerResultElem.innerHTML = "Draw xD";
	}
}

function setGamePoints() {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();
	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
	setGameElements();
	endGame(); //Added by me
}

// Solution of task 9.7 in lines 118 - 135
function endGame() {
	if (player.score === 10) {
		playerResultElem.innerHTML = player.name + " wins the game!";
		computerResultElem.innerHTML = "Computer looses!";
		gameState = "ended";
		computer.score = player.score = 0;
		alert('You win! Congratulations :-)');
	}
  else if (computer.score === 10) {
		playerResultElem.innerHTML = player.name + " looses!";
		computerResultElem.innerHTML = "Computer wins the game!";
		gameState = "ended";
		computer.score = player.score = 0;
		alert('You loose. Try again!');
	}
	setGameElements();
	setGamePoints();
}