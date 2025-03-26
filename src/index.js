const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // use querySelector() to get the timer element.

let time = 0;             //maybe current time spent by the user
let timer;                //Tracks the tinmer for the game
let lastHole = 0;         //Keeps track of the last hole where the mole appeared
let points = 0;           //Tracks user scores
let difficulty = "hard";  //relates to setDelay() function

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; //This will return a random number between min and max including both.
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  // TODO: Write your code here.
  if (difficulty === "hard"){
    return randomInteger(600, 1200);
  }
  else if(difficulty === "normal"){
    return 1000;
  }
  else{
    return 1500;
  }  
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
function chooseHole(holes) {        //This is a recurring function
  // TODO: Write your code here.
  let index = randomInteger(0, 8);  //Fetches for a hole from the given grid of 9 holes total.
  const hole = holes[index];        //The hole object based on the random number generated above.
  if (hole === lastHole){           //If the hole comes out to be the same as the last one, choose the hole again
    return chooseHole(holes);       //return once a new hole is found
  }
  lastHole = hole;                  //If the current hole is different than the previous hole, update the last hole to this hole.
  return hole;                      //Return that hole object.
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  // TODO: Write your code here
  if(time > 0){
    let timeoutId = showUp(); //if there is time left, look up another hole and repeat the process.
    return timeoutId;         //return the timeoutId when one is available. (This will mostly be "game stopped")
  }
  else{
    let gameStopped = stopGame();
    return gameStopped;
  }
}

/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  //The below line sets the difficulty level for the user when the game begins
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  //Choose a hole
  const hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);  //Passing the hole object and the delay value to show and hide function.
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole); //After the delay, toggle the visibility of this mole in this hole,
    //and check for whether or not to display another mole based on the remaining time,
    //which gets checked by this gameOver function below.
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole){
  // TODO: add hole.classList.toggle so that it adds or removes the 'show' class.
  // Here, the parameter 'hole' actually refers to the hole object and not just a number.
  hole.classList.toggle("show");
  // If show was not present before, it adds it to the classList and vice versa.
  return hole;
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
  //Increment the points global variable by 1
  points = points + 1;
  //Now we need to reflect this new score board on the web page.
  //score is already defined as a global variable which selects the appropriate element from the index.js
  score.textContent = points; //reflects the new points on the index.js
  return points;
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // TODO: Write your code here
  points = 0;
  score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  // TODO: Write your code here.
  // hint: this code is provided to you in the instructions.
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // TODO: Write your code here.
  updateScore();
  return points;
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  // TODO: Write your code here
  // this sets the event listeners for each mole where on every click on the mole, it triggers the fucntion whack!
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game by performing the following steps: 

 * 1. Clears the score using `clearScore()`. 

 * 2. Sets the game duration using `setDuration()`. 

 * 3. Sets up event listeners on the moles using `setEventListeners()`.

 * 4. Starts the game timer by calling `startTimer()`.  

 * 5. Begins the game loop by calling `showUp()` to display moles. 


 * Note: Simply uncommenting `setDuration(10);` and `showUp();` is not enough. To make the game work, ensure all necessary functions listed above are called to initialize the score, timer, event listeners, and mole appearances. 
*/
function startGame(){
  clearScore();
  //stopGame();   //optional
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
