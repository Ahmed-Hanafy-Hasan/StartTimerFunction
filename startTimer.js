function startTimer() {
    clearInterval(timer); // Clear any existing timer
    let timerSeconds = nextQuestionID % 2 === 1 ? 5 : 10; // Set timer to 5 seconds for odd-numbered questions, 10 seconds for even-numbered questions
    const timerDisplay = document.getElementById('timer');

    // Debug: Log the current question ID
    console.log("Starting timer for question:", nextQuestionID);

    // Select elements specific to the current question
    const container2Button = document.getElementById(nextQuestionID).querySelector('.container2 button');

    // Set the default style to gray
    container2Button.style.borderColor = "#ccc";
    container2Button.style.backgroundColor = "#ccc";
    container2Button.style.cursor = "not-allowed";

    if (nextQuestionID % 2 === 1) {
        // Apply CSS styles for centering if the question ID is odd
        timerDisplay.classList.add('large-timer'); // Add class for larger timer font size
        timerDisplay.style.position = 'fixed';
        timerDisplay.style.top = '50%';
        timerDisplay.style.left = '50%';
        timerDisplay.style.transform = 'translate(-50%, -50%)';
        timerDisplay.style.textAlign = 'center';
        timerDisplay.style.height = '330px'
        timerDisplay.innerHTML = '<strong>Take Your Rest Time And Be Ready For The Next Question</strong><br>' + timerSeconds + 's';
    }
    else{
        timerDisplay.classList.remove('large-timer'); // Remove class for larger timer font size
        // Reset the timer styles if the question ID is even
        timerDisplay.style.position = 'fixed';
        timerDisplay.style.top = '20px';
        // timerDisplay.style.right = '25px';
        timerDisplay.style.backgroundColor = '#094546';
        // timerDisplay.style.padding = '5px 10px';
        // timerDisplay.style.marginRight = '100px';
        timerDisplay.style.borderRadius = '5px';
        timerDisplay.style.height = '70px'
        timerDisplay.innerText = timerSeconds + 's'; // Update the timer display
    }

    timer = setInterval(function () {
        if (nextQuestionID % 2 === 1) {
            // Display the message for odd-numbered questions
            timerDisplay.innerHTML = '<strong>Take Your Rest Time And Be Ready For The Next Question</strong><br>' + timerSeconds + 's';
        } else {
            timerDisplay.innerText = timerSeconds + 's'; // Update the timer display
        }
        if (timerSeconds === 0) {
            clearInterval(timer); // Stop the timer

            // Move to the next question even if no choice is selected
            if (selectedChoice === null) {
                // If no choice is selected, assign a random value
                const choices = document.getElementById(nextQuestionID).querySelectorAll('.outlined-button');
                const randomIndex = Math.floor(Math.random() * choices.length);
                selectedChoice = choices[randomIndex];
            }

            nextQuestion();
        } else if (timerSeconds <= 3 && selectedChoice === null) {
            // Check if a choice is not selected before changing the button color
            container2Button.style.borderColor = "#FFA07A";
            container2Button.style.backgroundColor = "#FFA07A";
        }
        timerSeconds--; // Decrement the timer
    }, 1000);
}