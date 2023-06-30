//*** more explanation at the bottom of the code */


//This class provides a convenient way to encapsulate and reuse line drawing functionality in your code.
class DrawLine {
    constructor(context, startX, startY, endX, endY) { //startX, startY: The coordinates of the starting point of the line.
        this.context = context;                        //endX, endY: The coordinates of the ending point of the line.
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    draw() {
        this.context.beginPath();
        this.context.moveTo(this.startX, this.startY);
        this.context.lineTo(this.endX, this.endY);
        this.context.stroke();
    }
    /**The draw method: It is responsible for actually drawing the line on the canvas. Here's how it works:

It begins a new path using the beginPath method of the rendering context.
It moves the current drawing position to the starting point of the line using the moveTo method, which takes the startX and startY coordinates as arguments.
It creates a line segment from the current drawing position to the ending point of the line using the lineTo method, which takes the endX and endY coordinates as arguments.
Finally, it strokes the path to actually draw the line on the canvas using the stroke method. */
}
class DrawCircle {
    constructor(context, centerX, centerY, radius) {
        this.context = context;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);
        this.context.stroke();
    }
    /**The arc method is used to draw arcs or circles on a canvas element 
     * 0: This parameter represents the starting angle of the arc in radians. In this case, it is 0, which corresponds to the 3 o'clock position on a clock face.
     * Math.PI * 2: This parameter represents the ending angle of the arc in radians. A full circle is 2π radians, so Math.PI * 2 corresponds to a complete circle.
    true: This parameter specifies the drawing direction of the arc. When set to true, it indicates a counter-clockwise direction, while false indicates a clockwise direction.
    The centerX and centerY coordinates determine the position of the center of the arc, the radius determines the size of the arc, and the starting and ending angles control the portion of the circle that is drawn.
    */
}


function drawHangingPost() {
    // Vertical post
    let verticalPost = new DrawLine(hangmanCanvasContext, 22, 10, 22, 148);
    verticalPost.draw();

    // Horizontal beam
    let horizontalBeam = new DrawLine(hangmanCanvasContext, 22, 10, 150, 10);
    horizontalBeam.draw();

    // Short vertical line
    let shortVerticalLine = new DrawLine(hangmanCanvasContext, 150, 10, 150, 25);
    shortVerticalLine.draw();
}

function drawHangmanBody(incorrectGuesses) {
    switch (incorrectGuesses) {
        case 1:
            // Head
            let head = new DrawCircle(hangmanCanvasContext, 150, 38, 12);
            head.draw();
            break;
        case 2:
            // Body
            let body = new DrawLine(hangmanCanvasContext, 150, 50, 150, 80);
            body.draw();
            break;
        case 3:
            // Left arm
            let leftArm = new DrawLine(hangmanCanvasContext, 150, 50, 100, 60);
            leftArm.draw();
            break;
        case 4:
            // Right arm
            let rightArm = new DrawLine(hangmanCanvasContext, 150, 50, 200, 60);
            rightArm.draw();
            break;
        case 5:
            // Left leg
            let leftLeg = new DrawLine(hangmanCanvasContext, 150, 80, 100, 100);
            leftLeg.draw();
            break;
        case 6:
            // Right leg
            let rightLeg = new DrawLine(hangmanCanvasContext, 150, 80, 200, 100);
            rightLeg.draw();
            break;
        default:
            break;
    }
}





submitWord.addEventListener('click', (event) => {
    if (!btnCr) {
        const reset = document.createElement('button');
        reset.setAttribute('id', 'reset');
        reset.textContent = 'RESET';
        reset.style.padding = '10px 20px';
        reset.style.backgroundColor = 'blue';
        reset.style.color = 'white';
        reset.style.border = 'none';
        reset.style.cursor = 'pointer';
        reset.style.borderRadius = '50%'
        reset.style.marginTop = '10px';
        reset.style.transition = 'transform 0.3s ease-in-out';


        hangManCanvas.style.height = '30vw';
        hangManCanvas.style.width = '25vw';
        hangManCanvas.style.marginTop = '-5%';
        hangManCanvas.style.backgroundColor = 'green';

        gameSpotLight.style.display = 'flex';
        gameSpotLight.style.textAlign = 'center';

        const gContainerMain = document.createElement('div');
        const guesses = document.createElement('h3');
        const gContainer = document.createElement('div');

        gContainerMain.classList.add('gContainerMain');
        gContainer.classList.add('gContainer');
        guesses.setAttribute('id', 'guesses');
        gContainer.setAttribute('id', 'guessesContainer');
        guesses.textContent = 'GUESSED LETTERS';
        gContainer.style.backgroundColor = 'red';
        gContainerMain.setAttribute('id', 'gContainerMain');
        gContainerMain.style.height = '15vw';
        gContainerMain.style.top = '0%';
        gContainerMain.style.marginTop = '2%';

        wordSpotLight.style.display = 'flex';
        wordSpotLight.style.justifyContent = 'space-evenly';
        wordSpotLight.style.flexDirection = 'column';
        gContainerMain.style.display = 'flex';
        gContainerMain.style.justifyContent = 'space-evenly';
        gContainerMain.style.flexDirection = 'row';
        console.dir('START HERE');
        word = wordInput.value.toLowerCase();
        console.log(word);
        console.dir('ends here');

        for (let i = 0; i < word.length; i++) {
            // Creating HTML content
            let dashes = document.createElement('h2');
            dashes.style.color = 'white';
            dashes.innerText = '_';
            dashesElements.push(dashes); // Store the dash element
            gContainerMain.appendChild(dashes);
        }
        gameSpotLight.appendChild(reset);
        gContainer.appendChild(guesses);
        wordSpotLight.appendChild(gContainer);
        wordSpotLight.appendChild(gContainerMain);

        btnCr = true;
    }
    wordSetup.style.display = 'none';
    gameSpotLight.style.display = 'block';

    // Keyboard section

    alphabet.forEach(function (letter) {
        let btn = document.createElement('button');
        btn.value = letter;
        // Add styles to the button
        btn.style.marginRight = '10px'; // Add 10 pixels of right margin between the buttons
        btn.style.marginTop = '10px'; // Add 10 pixels of top margin to each button


        btn.style.padding = '10px 20px'; // Increase the padding for a larger button
        btn.style.backgroundColor = 'coral'; // Change the background color
        btn.style.color = 'white'; // Change the text color
        btn.style.border = 'none'; // Remove the border
        btn.style.borderRadius = '5px'; // Add rounded corners        
        btn.textContent = letter;

        keyboard.appendChild(btn);
    });
    /**forEach method takes a callback function as an argument, and this callback function is executed for each element in the array. 
    */
    drawHangingPost();
});



gameSpotLight.addEventListener('click', (event) => {
    if (event.target.id === 'reset') {
        wordSetup.style.display = 'block';
        gameSpotLight.style.display = 'none';
        keyboard.innerHTML = '';
        wordInput.value = '';
        reset.remove();
        btnCr = false;
        wordSpotLight.innerHTML = '';
        word = ''; // Reset word
        guessedLetters = []; // Reset guessed letters
        incorrectGuesses = 0; // Reset incorrect guesses
        dashesElements = []; // Reset dashesElements array
        hangmanCanvasContext.clearRect(0, 0, hangManCanvas.width, hangManCanvas.height);
        wordSetup.style.display = 'flex';
        wordSetup.style.flexDirection = 'column';
        wordSetup.style.alignItems = 'center';
        wordSetup.style.justifyContent = 'center';

    }
    console.log(event.target.id);
});

keyboard.addEventListener('click', (event) => {
    let guessedLetter = event.target.value;
    let correctGuess = false;  //let correctGuess = false; initializes a boolean variable correctGuess to false. This variable will be used to track whether the guessed letter is correct or not.

    for (let i = 0; i < word.length; i++) {
        if (word[i] === guessedLetter) {
            correctGuess = true;
            dashesElements[i].innerText = guessedLetter;

            dashesElements[i].style.color = 'white'; // Set the color to white
        }
    }
    //*** 
    if (!correctGuess) {    //If the condition is true (guessed letter is incorrect)
        winCr = true;
        incorrectGuesses++; // Increase the number of incorrect guesses

        drawHangmanBody(incorrectGuesses); // Draw hangman part

        if (incorrectGuesses >= 6) {
            // Game over, all hangman parts drawn
            setTimeout(() => {
                alert("You lost!");
            }, 200); // Delay alert for 200 milliseconds
        }
    } else {
        winCr = true;
        // Check if the word has been guessed
        const currentGuessedWord = dashesElements.map((element) => element.innerText).join('');
        if (currentGuessedWord === word) {

            setTimeout(() => {
                alert("You've guessed the word!");
            }, 200); // Delay alert for 200 milliseconds
        }
    }

});







/**The for loop iterates over each letter of the given word. The variable i represents the index of each letter in the word.

Inside the loop, the code checks if the current letter of the word matches the guessed letter. This is done using the condition if (word[i] === guessedLetter).

If there is a match, the variable correctGuess is set to true, indicating that the guessed letter is correct.

Additionally, the corresponding displayed letter element is updated with the guessed letter using the line dashesElements[i].innerText = guessedLetter. This replaces the underscore symbol (_) with the correctly guessed letter in the displayed word.

To make the correctly guessed letter more visible, the line dashesElements[i].style.color = 'white' is added inside the if block. This changes the color of the displayed letter element to white, making it visible because the background is dark.

The code then proceeds to check if all the letters in the word have been guessed correctly by comparing the current guessed word with the original word.

The map method is used here to extract the inner text of each displayed letter element (dashesElements). It creates a new array containing the letters of the guessed word.

The join('') method is called on the array of guessed letters to concatenate them into a string.

Finally, the code compares the concatenated guessed word (currentGuessedWord) with the original word to check if they match.

If the guessed word matches the original word, it means that all the letters have been correctly guessed, and the code displays a message indicating that the word has been guessed.

In summary, the map method is used to transform the displayed letter elements into a string representation of the current guessed word. The comparison of guessed letters to the given word is done through the for loop and the if statement, while the map method is used to create the guessed word for comparison purposes. */