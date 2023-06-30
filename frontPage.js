//lines marked with   //***   have explanation at the bottom of the page*/


let word = ''; // This is an empty string that will hold the word that other players need to guess
let guessedLetters = []; // This is an array that will hold the letters that have been guessed
let incorrectGuesses = 0; // This will count how many incorrect guesses have been made

const labelElement = document.querySelector('label[for="wordInput"]');
const instruction = document.createElement('p');
const wordInput = document.getElementById('wordInput');
const submitWord = document.querySelector('#submitWord');
const wordSetup = document.querySelector('#wordSetup');
const gameSpotLight = document.querySelector('#gameSpotLight');
const wordSpotLight = document.querySelector('#wordSpotLight');
const keyboard = document.querySelector('#keyboard');
const hangManCanvas = document.querySelector('#hangManCanvas');
const hangmanCanvasContext = hangManCanvas.getContext('2d');
const hangmanGameTitle = document.querySelector('h1');  
 //document.querySelector. Then, a 2D drawing context is retrieved using the getContext('2d') method. The context is an object with properties and methods that  are used to render graphics inside the canvas element.
let btnCr = false;
let winCr = false;
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',];
let dashesElements = [];
let height = '30vw'
let guessesLeft; // Variable for the number of guesses left

// Create the video element
const video = document.createElement('video');
video.id = 'myVideo';

// Set the video source
video.src = 'backgroundFront.mp4';
video.type = 'video/mp4';

// Set video attributes
video.autoplay = true;
video.loop = true;
video.muted = true;
video.style.position = 'fixed';
video.style.top = '0';
video.style.left = '0';
video.style.width = '100%';
video.style.height = '100%';
video.style.objectFit = 'cover';
video.style.zIndex = '-1';

// Append the video to the body
document.body.appendChild(video);

console.dir(wordSetup)
wordSetup.style.display = 'flex';
wordSetup.style.flexDirection = 'column';
wordSetup.style.alignItems = 'center';
wordSetup.style.justifyContent = 'center';
wordSetup.style.height = '100vh';
wordSetup.style.fontSize = '50px';
wordSetup.style.marginBottom = '20px';

hangmanGameTitle.style.position = 'relative';
hangmanGameTitle.style.top = '-20px';    //hangmanGameTitle.style.top = '-20px' moves the element 20 pixels higher
hangmanGameTitle.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';   //*** 
hangmanGameTitle.style.transform = 'rotate(-5deg)';
hangmanGameTitle.style.color = '#FFFFFF';



labelElement.setAttribute('id', 'wordInputLabel');
labelElement.style.textShadow = '4px 4px 4px rgba(0,0,0,0.5)';
labelElement.style.color = '#4f759b';
labelElement.style.transform = 'rotate(5deg)';
labelElement.style.marginBottom = '50px'


wordInput.style.marginTop = '10px';
wordInput.style.padding = '5px';
wordInput.style.width = '200px';
wordInput.style.backgroundColor = 'yellow';
wordInput.style.borderRadius = '35%';
wordInput.placeholder = '""""""""""""I keep my Word:""""""""';


instruction.id = 'instruction';
instruction.textContent = 'This is the Hangman game, a game for two players. Please decide who will enter the word and who will guess the letters.';
instruction.style.width = '80%';
instruction.style.margin = '20px auto';

instruction.style.fontFamily = "cursive";
instruction.style.fontWeight = 'bold';
instruction.style.fontStyle = 'italic';
instruction.style.color = '#EDFFAB';

instruction.style.textShadow = '4px 4px 8px rgba(0, 0, 400, 0.9)';   //*** 



// Add styles and effects to the submitWord button
submitWord.style.padding = '10px 20px';
submitWord.style.backgroundColor = 'blue';
submitWord.style.color = 'white';
submitWord.style.border = 'none';
submitWord.style.cursor = 'pointer';
submitWord.style.borderRadius = '50%'
submitWord.style.marginTop = '10px';
submitWord.style.transition = 'transform 0.3s ease-in-out';


submitWord.addEventListener('mouseover', () => {   //*** 
    submitWord.style.transform = 'scale(2)';
});
/**When the mouseover event occurs, the code inside the event listener function is executed. In this case, it sets the transform property of the submitWord button's style to 'scale(1.1)'.
 * By using the mouseover event and modifying the transform property, you can create interactive effects on elements when the user interacts with them, adding visual feedback and enhancing the user experience. 
 * 
 * 
*/

submitWord.addEventListener('mouseout', () => {
    submitWord.style.transform = 'scale(1)';
});




wordSetup.appendChild(instruction);










/**In addition to scale(1.1), you can use various other transformations and CSS properties to create different visual effects when the user hovers over an element. Here are some examples:

Scale: scale(1.1) increases the size of the element. You can also use other scale values like scale(0.9) to decrease the size or scale(2) to double the size.

Rotate: rotate(45deg) rotates the element by 45 degrees. You can specify different angles, such as -90deg for a clockwise rotation or 180deg for a complete flip.

Translate: translate(10px, 10px) moves the element horizontally and vertically. You can change the pixel values to move it in different directions.

Skew: skew(10deg, -5deg) skews the element along the x and y axes. Adjust the degree values to achieve different skew effects.

Opacity: opacity(0.8) changes the transparency of the element. Values range from 0 to 1, where 0 is completely transparent and 1 is fully opaque.

Box Shadow: box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5) adds a shadow effect to the element. You can adjust the shadow's offset, blur radius, and color to create different shadow styles.

Background Color: background-color: yellow changes the background color of the element. You can specify any valid color value, such as named colors (red, blue, etc.) or hexadecimal color codes (#FF0000, #00FF00, etc.). 





The line hangmanGameTitle.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)' adds a text shadow effect to the hangmanGameTitle element.

Here's a breakdown of the values used in the textShadow property:

2px represents the horizontal offset of the shadow. In this case, the shadow will be positioned 2 pixels to the right of the text.
2px represents the vertical offset of the shadow. In this case, the shadow will be positioned 2 pixels below the text.
5px represents the blur radius of the shadow. This determines how blurred or spread out the shadow appears. In this case, the shadow will have a blur radius of 5 pixels.
rgba(0, 0, 0, 0.5) specifies the color and opacity of the shadow. The rgba value represents a color in red-green-blue-alpha format. In this case, the shadow color is black (0, 0, 0) and the opacity is set to 0.5. This means the shadow will have a translucent effect, allowing some of the underlying content to show through.*/