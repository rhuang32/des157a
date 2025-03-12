(function() {
    "use strict"; // Use strict mode for better error handling and cleaner code

    console.log ('reading js');

    // My DOM elements
    const lebronScore = document.querySelector(".player-left .score"); // LeBron's score element
    const kobeScore = document.querySelector(".player-right .score"); // Kobe's score element
    const currentTurnScoreBox = document.querySelector(".score-box"); // Box displaying the current score for the turn
    const takeShotBtn = document.querySelector(".action:nth-child(2)"); // Button to take a shot
    const passBallBtn = document.querySelector(".action:nth-child(3)"); // Button to pass the ball
    const winnerText = document.querySelector(".winner"); // Text element displaying the winner
    const ball = document.querySelector(".start-ball"); // Ball element
    const newGameBtn = document.querySelector(".new-game"); // Button to start a new game
    const lebron = document.querySelector(".lebron"); // LeBron's player element
    const kobe = document.querySelector(".kobe"); // Kobe's player element
    const mainSection = document.querySelector(".main"); // Main section to show popups
    // const ball time to set time of swish sound hitting the basket 5s ball time = 0.95

    // Game data
    const gameData = {
        players: ["LeBron", "Kobe"], // Player names
        score: [0, 0], // Initial scores for both players
        rollSum: 0, // Sum of dice roll
        index: 0, // Current player's index (0 for LeBron, 1 for Kobe)
        gameEnd: 21, // Points required to win the game
        currentTurnScore: 0, // Current score for the turn
        gameOver: false // Flag indicating if the game is over
    };

    // Start new game when the button is clicked
    newGameBtn.addEventListener("click", function() {
        gameData.index = Math.round(Math.random()); // Randomly decide who goes first
        gameData.score = [0, 0]; // Reset scores
        gameData.currentTurnScore = 0; // Reset current turn score
        gameData.gameOver = false; // Reset game over flag
        lebronScore.textContent = "0"; // Reset LeBron's score display
        kobeScore.textContent = "0"; // Reset Kobe's score display
        currentTurnScoreBox.textContent = "0"; // Reset current turn score display
        winnerText.textContent = ""; // Clear winner text
        // Set player visibility based on who goes first
        lebron.style.opacity = gameData.index === 0 ? "1" : "0.5";
        kobe.style.opacity = gameData.index === 1 ? "1" : "0.5";
        ball.style.display = "none"; // Hide ball initially
        setUpTurn(); // Set up the next turn
    });

    // Set up the turn for the current player
    function setUpTurn() {
        if (!gameData.gameOver) {
            takeShotBtn.disabled = false; // Enable the shot button
            passBallBtn.disabled = true; // Disable the pass button
            currentTurnScoreBox.textContent = gameData.currentTurnScore; // Display the current turn score
        }
    }

    // Throw dice ball to simulate a shot
    function throwDice() {
        if (gameData.gameOver) return; // If the game is over, don't allow further actions
        takeShotBtn.disabled = true; // Disable shot button
        passBallBtn.disabled = true; // Disable pass button

        gameData.rollSum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1; // Simulate a dice roll (2 dice)

        animatePlayer(); // Animate the player making the shot
        ball.style.display = "block"; // Show the ball
        ball.style.animation = gameData.index === 0 ? "toBasketLeft 5s ease forwards" : "toBasketRight 3s ease forwards"; // Animate ball to the basket based on the player

        setTimeout(function() {
            ball.style.display = "none"; // Hide the ball after the animation
            ball.style.animation = ""; // Reset the animation
            if (gameData.rollSum === 2) { // If the roll sum is 2, it's a miss
                gameData.score[gameData.index] = 0; // Reset the score for the player
                gameData.currentTurnScore = 0; // Reset current turn score
                currentTurnScoreBox.textContent = "0"; // Update score display
                updateScoreboard(); // Update the scoreboard
                switchPlayer(); // Switch to the next player
                animateBallMiss(); // Animate the ball miss
                setTimeout(setUpTurn, 2000); // Set up the next turn after a short delay
            } else { // If the shot is successful
                const points = Math.floor(Math.random() * 4) + 1; // Randomly decide how many points (1-4)
                gameData.currentTurnScore += points; // Add points to current turn score
                gameData.score[gameData.index] += points; // Add points to player's total score
                currentTurnScoreBox.textContent = gameData.currentTurnScore; // Update current turn score display
                updateScoreboard(); // Update the scoreboard
                showPopup(points); // Show a popup with the points scored
                checkWinningCondition(); // Check if the current player has won
                setTimeout(function() {
                    takeShotBtn.disabled = false; // Re-enable the shot button
                    passBallBtn.disabled = false; // Re-enable the pass button
                }, 500); // After a short delay, re-enable buttons
            }
        }, 1000); // Wait 1 second before hiding the ball
    }

    // Animate the player making the shot
    function animatePlayer() {
        const player = gameData.index === 0 ? lebron : kobe; // Select the current player
        player.style.transition = "transform 0.5s ease"; // Set transition for smooth movement
        player.style.transform = "translateY(-20px)"; // Move the player up slightly
        setTimeout(function() {
            player.style.transform = "translateY(0)"; // Return the player to the original position
        }, 500); // After 0.5 seconds, reset the position
    }

    // Animate a missed shot
    function animateBallMiss() {
        ball.style.display = "block"; // Show the ball again
        ball.style.animation = gameData.index === 0 ? "missLeft 1s ease forwards" : "missRight 1s ease forwards"; // Animate the ball missing the basket

        setTimeout(function() {
            showPopup("Air Ball!"); // Show a "miss" message
            setTimeout(function() {
                ball.style.display = "none"; // Hide the ball
                ball.style.animation = ""; // Reset the animation
            }, 500); // After 0.5 seconds, hide the ball
        }, 1000); // Wait 1 second before showing the miss message
    }

    // Switch to the other player
    function switchPlayer() {
        gameData.index = 1 - gameData.index; // Switch the player index (0 becomes 1, 1 becomes 0)
        lebron.style.opacity = gameData.index === 0 ? "1" : "0.5"; // Adjust opacity based on the active player
        kobe.style.opacity = gameData.index === 1 ? "1" : "0.5"; // Adjust opacity for the other player
    }

    // Update the scoreboard with the current scores
    function updateScoreboard() {
        lebronScore.textContent = gameData.score[0]; // Updates LeBron's score
        kobeScore.textContent = gameData.score[1]; // Updates Kobe's score
    }

    // Check if the current player has won
    function checkWinningCondition() {
        if (gameData.score[gameData.index] >= gameData.gameEnd && !gameData.gameOver) { // If the current player's score is 21 or more
            winnerText.textContent = gameData.players[gameData.index] + " wins!"; // Display the winner
            gameData.gameOver = true; // Set the game over flag
            takeShotBtn.disabled = true; // Disable the shot button
            passBallBtn.disabled = true; // Disable the pass button
            newGameBtn.textContent = "Start a New Game?"; // Change the new game button text
            ball.style.cssText = "display: block; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 1;"; // Position the ball in the center
        }
    }

    // Show a popup with a message
    function showPopup(text) {
        const popup = document.createElement("div"); // Create a new div element for the popup
        popup.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.9); padding: 10px 30px; border-radius: 10px; font-size: 2rem; font-weight: bold; color: #000; z-index: 10; opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;"; // Style the popup
        popup.textContent = text; // Set the text of the popup
        mainSection.appendChild(popup); // Add the popup to the main section
        setTimeout(function() {
            popup.style.opacity = "1"; // Fade in the popup
            popup.style.transform = "translate(-50%, -60%)"; // Move the popup slightly
        }, 10);
        setTimeout(function() {
            popup.style.opacity = "0"; // Fade out the popup
            popup.style.transform = "translate(-50%, -50%)"; // Reset the position
            setTimeout(function() {
                mainSection.removeChild(popup); // Remove the popup from the DOM
            }, 500);
        }, 1000); // After 1 second, fade out the popup
    }

    // Event listeners for button actions
    takeShotBtn.addEventListener("click", throwDice); // Trigger shot when clicked
    passBallBtn.addEventListener("click", function() {
        if (!gameData.gameOver) { // If the game is not over
            gameData.currentTurnScore = 0; // Reset the current turn score
            currentTurnScoreBox.textContent = "0"; // Update score display
            updateScoreboard(); // Updates the scoreboard
            switchPlayer(); // Switches to the next player
            setUpTurn(); // Set up the next turn
        }
    });
})();
