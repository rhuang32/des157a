(function() {
    "use strict";

    console.log("reading js");

    // My DOM elements
    const lebronScore = document.querySelector(".player-left .score");
    const kobeScore = document.querySelector(".player-right .score");
    const currentTurnScoreBox = document.querySelector(".score-box");


    const takeShotBtn = document.querySelector(".action:nth-child(2)");
    const passBallBtn = document.querySelector(".action:nth-child(3)");
    const winnerText = document.querySelector(".winner");


    const ball = document.querySelector(".start-ball");
    const newGameBtn = document.querySelector(".new-game");
    const lebron = document.querySelector(".lebron");
    const kobe = document.querySelector(".kobe");

    // Game state data
    const gameData = {
        players: ["LeBron", "Kobe"],
        score: [0, 0],
        index: 0, // Track current player
        gameEnd: 21, // Winning score
        gameOver: false,
        currentTurnScore: 0
    };

    // Start a new game
    newGameBtn.addEventListener("click", function() {
        gameData.index = Math.round(Math.random()); // Random start
        gameData.score = [0, 0];
        gameData.currentTurnScore = 0;
        gameData.gameOver = false;
        lebronScore.textContent = "0";
        kobeScore.textContent = "0";
        currentTurnScoreBox.textContent = "0";
        winnerText.textContent = "";
        ball.style.display = "none";
        highlightCurrentPlayer();
        setUpTurn();
    });

    // Highlights the active player
    function highlightCurrentPlayer() {
        lebron.style.opacity = gameData.index === 0 ? "1" : "0.5";
        kobe.style.opacity = gameData.index === 1 ? "1" : "0.5";
    }

    // Prepares for the next turn
    function setUpTurn() {
        if (gameData.gameOver) return;
        takeShotBtn.disabled = false;
        passBallBtn.disabled = true;
        currentTurnScoreBox.textContent = gameData.currentTurnScore;
    }

    // Handles roll (taking a shot)
    function throwBall() {
        if (gameData.gameOver) return;
        takeShotBtn.disabled = true;
        passBallBtn.disabled = true;

        var roll1 = Math.floor(Math.random() * 6) + 1;
        var roll2 = Math.floor(Math.random() * 6) + 1;
        var rollSum = roll1 + roll2;
        var pointsToAward = rollSum === 2 ? 0 : Math.floor(Math.random() * 4) + 1;

        animatePlayer();
        setTimeout(function() {
            if (rollSum === 2) {
                gameData.score[gameData.index] = 0; // Resets score on snake eyes
            } else {
                gameData.score[gameData.index] += pointsToAward;
            }
            updateScoreboard();
            takeShotBtn.disabled = false;
            passBallBtn.disabled = false;
            animateBall(pointsToAward);
            checkWinningCondition();
        }, 500);
    }

    // Animates the player taking action
    function animatePlayer() {
        var playerImg = gameData.index === 0 ? lebron : kobe;
        playerImg.style.transition = "transform 0.5s ease";
        playerImg.style.transform = "translateY(-20px)";
        setTimeout(function() {
            playerImg.style.transform = "translateY(0)";
        }, 500);
    }

    // Shows points scored
    function animateBall(points) {
        ball.style.display = "block";
        ball.style.transition = "all 0.8s ease";
        ball.style.top = "20%";
        ball.style.left = "95%";
        setTimeout(function() {
            ball.style.display = "none";
        }, 1000);
    }

    // Updates the score display
    function updateScoreboard() {
        lebronScore.textContent = gameData.score[0];
        kobeScore.textContent = gameData.score[1];
    }

    // Checks if the current player has won
    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd) {
            winnerText.textContent = gameData.players[gameData.index] + " wins!";
            gameData.gameOver = true;
            takeShotBtn.disabled = true;
            passBallBtn.disabled = true;
        }
    }

    // Handle ball passing (switching players)
    passBallBtn.addEventListener("click", function() {
        if (gameData.gameOver) return;
        gameData.currentTurnScore = 0;
        currentTurnScoreBox.textContent = "0";
        gameData.index = 1 - gameData.index; // Switch player
        highlightCurrentPlayer();
        setUpTurn();
    });

    takeShotBtn.addEventListener("click", throwBall);
})();
