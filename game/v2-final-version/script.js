(function() {
    "use strict"; 
    console.log('reading js'); 

    const lebronScore = document.querySelector(".player-left .score"); // LeBron’s score element
    const kobeScore = document.querySelector(".player-right .score"); // Kobe’s score element
    const currentTurnScoreBox = document.querySelector(".score-box"); // Current turn score element
    const takeShotBtn = document.querySelector(".action:nth-child(2)"); // "Take Shot" btn
    const passBallBtn = document.querySelector(".action:nth-child(3)"); // "Pass Ball" btn
    const winnerText = document.querySelector(".winner"); // Winner text element
    const ball = document.querySelector(".start-ball"); // Ball element for animation
    const newGameBtn = document.querySelector(".new-game"); // "New Game" btn
    const lebron = document.querySelector(".lebron"); // LeBron player element
    const kobe = document.querySelector(".kobe"); // Kobe player element
    const mainSection = document.querySelector(".main"); // Main game container
    const rulesOverlay = document.querySelector(".rules-overlay"); // Rules overlay element
    const closeBtn = document.querySelector(".close-btn"); // Close rules button
    const volumeSlider = document.querySelector(".volume-slider"); // Volume slider element

    // Audio setup
    const audio = new Audio('audio/crowd.wav'); // Crowd background audio
    const swishSound = new Audio('audio/swish.wav'); // Swish sound for shot makes
    const ballTime = 2000; // Ball animation duration (2s)
    const swishTime = 1000; // Swish sound timing (1s)
    audio.loop = true; // Loops crowd noise
    audio.volume = 0.25; // Initial crowd volume (25%)
    swishSound.volume = 0.25; // Initial swish volume (25%)

    const gameData = { // Game state object
        players: ["LeBron", "Kobe"], // Player names
        score: [0, 0], // Scores [LeBron, Kobe]
        rollSum: 0, // Dice roll sum
        index: 0, // Current player (0 = LeBron, 1 = Kobe)
        gameEnd: 21, // Winning score
        currentTurnScore: 0, // Turn score
        gameOver: false // Game status
    };

    newGameBtn.addEventListener("click", startNewGame); // New game button listener
    takeShotBtn.addEventListener("click", throwBall); // Take shot button listener
    passBallBtn.addEventListener("click", function() { if (!gameData.gameOver) endTurn(); }); // Pass ball listener
    closeBtn.addEventListener("click", function() { rulesOverlay.style.display = "none"; }); // Close rules listener
    if (volumeSlider) { // If slider exists
        volumeSlider.addEventListener("input", adjustVolume); // Updates volume on drag
        volumeSlider.addEventListener("change", adjustVolume); // Updates volume on click/release
        console.log('Volume slider event listeners added'); // Confirms slider setup
    } else {
        console.error('Volume slider is not working properly.'); // Warns if slider missing
    }

    function startNewGame() { // Resets and starts a new game
        gameData.index = Math.round(Math.random()); // Randomly picks starting player
        gameData.score = [0, 0]; // Resets scores
        gameData.currentTurnScore = 0; // Resets turn score
        gameData.gameOver = false; // Sets game as active
        lebronScore.textContent = kobeScore.textContent = currentTurnScoreBox.textContent = "0"; // Clears score displays
        winnerText.textContent = ""; // Clears winner text
        lebron.style.opacity = gameData.index === 0 ? "1" : "0.5"; // Highlights active player
        kobe.style.opacity = gameData.index === 1 ? "1" : "0.5"; // Highlights active player
        ball.style.display = "none"; // Hides ball
        rulesOverlay.style.display = "block"; // Shows rules
        playBackgroundAudio(); // Starts crowd noise
        setUpTurn(); // Prepares turn
    }

    function setUpTurn() { // This function sets up current turn
        if (!gameData.gameOver) { // Only if game isn’t over
            takeShotBtn.disabled = false; // Enables shot button
            passBallBtn.disabled = true; // Disables pass button
            currentTurnScoreBox.textContent = gameData.currentTurnScore; // Updates turn score
        }
    }

    function throwBall() { // This function simulates a shot
        if (gameData.gameOver) return; // Exits if game over
        takeShotBtn.disabled = passBallBtn.disabled = true; // Disables buttons during shot
        gameData.rollSum = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1; // Rolls two dice
        animateShot(gameData.index === 0 ? "toBasketLeft" : "toBasketRight", ballTime, handleShotResult); // Animates shot
    }

    function animateShot(animation, duration, callback) { // This function animates ball and player
        const player = gameData.index === 0 ? lebron : kobe; //  Picks current player
        player.style.transition = "transform 0.5s ease"; // Sets smooth jump
        player.style.transform = "translateY(-15px)"; // Moves player up
        ball.style.display = "block"; // Shows ball
        ball.style.animation = `${animation} ${duration}ms ease-in-out forwards`; // Runs ball animation
        
        if (gameData.rollSum !== 2) { // If outcome is not an air ball
            setTimeout(function() { swishSound.play().then(function() { // Plays swish sound
                console.log(`Swish sound played successfully at ${swishTime}ms`); // Logs swish
            })}, swishTime); // Delays swish sound
        }

        setTimeout(function() { // After animation
            player.style.transform = "translateY(0)"; // Resets player position
            ball.style.display = "none"; // Hides ball
            ball.style.animation = ""; // Clears animation
            callback(); // Handles shot result
        }, duration);
    }

    function handleShotResult() { // This function is for processing the shot outcomes
        if (gameData.rollSum === 2) { // Air ball case
            gameData.score[gameData.index] = gameData.currentTurnScore = 0; // Resets scores
            updateScoreboard(); // Updates display
            switchPlayer(); // Switches player
            showPopup("Air Ball!"); // Shows miss popup
            setTimeout(setUpTurn, 1000); // Prepares next turn
        } else { // Made shot
            const points = Math.floor(Math.random() * 4) + 1; // Random points (1-4)
            gameData.currentTurnScore += points; // Adds to turn score
            gameData.score[gameData.index] += points; // Adds to total score
            updateScoreboard(); // Updates display
            showPopup(`${points} points`); // Shows points popup
            checkWinningCondition(); // Checks for win
            setTimeout(function() { takeShotBtn.disabled = passBallBtn.disabled = false; }, 500); // Re-enables buttons
        }
    }

    function endTurn() { // This function ends the current turn
        gameData.currentTurnScore = 0; // Resets turn score
        currentTurnScoreBox.textContent = "0"; // Updates display
        updateScoreboard(); // Updates scores
        switchPlayer(); // Switches player
        setUpTurn(); // Prepares next turn
    }

    function updateScoreboard() { // This function updates all score displays
        lebronScore.textContent = gameData.score[0]; // LeBron’s score
        kobeScore.textContent = gameData.score[1]; // Kobe’s score
        currentTurnScoreBox.textContent = gameData.currentTurnScore; // Turn score
    }

    function switchPlayer() { // This function switches active player
        gameData.index = 1 - gameData.index; // Toggles player (0 to 1 or 1 to 0)
        lebron.style.opacity = gameData.index === 0 ? "1" : "0.5"; // Highlights LeBron
        kobe.style.opacity = gameData.index === 1 ? "1" : "0.5"; // Highlights Kobe
    }

    function checkWinningCondition() { // This function checks if game is won
        if (gameData.score[gameData.index] >= gameData.gameEnd && !gameData.gameOver) { // If score ≥ 21
            winnerText.textContent = `${gameData.players[gameData.index]} wins!`; // Shows winner
            gameData.gameOver = true; // Ends game
            takeShotBtn.disabled = passBallBtn.disabled = true; // Disables buttons
            newGameBtn.textContent = "Start a New Game?"; // Updates button text
            ball.style.cssText = `display: block; top: 50%; left: 50%; transform: translate(-50%, -50%)`; // Centers ball
        }
    }

    function showPopup(text) { // This function shows temporary popup
        const popup = document.createElement("div"); // Creates popup div
        popup.style.cssText = ` 
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 30px;
            border-radius: 10px;
            font-size: 2rem;
            font-weight: bold;
            color: #000;
            z-index: 10;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        popup.textContent = text; // Sets popup text
        mainSection.appendChild(popup); // Adds to main section
        setTimeout(function() { popup.style.opacity = "1"; }, 10); // Fades in
        setTimeout(function() { popup.style.opacity = "0"; setTimeout(function() { popup.remove(); }, 500); }, 1000); // Fades out and removes
    }

    function adjustVolume() { // This function adjusts the audio volume in the entire file (background and swish noise)
        const volume = volumeSlider.value / 100; // Converts slider value to 0-1
        audio.volume = volume; // Sets crowd volume
        swishSound.volume = volume; // Sets swish volume
        console.log(`Volume adjusted to: ${volume} (slider value: ${volumeSlider.value})`); // Logs volume change
    }

    function playBackgroundAudio() { // This function starts the background audio
        audio.play().then(function() { // Plays crowd noise
            console.log('Background crowd noise started successfully'); // Logs success
        });
    }
})();