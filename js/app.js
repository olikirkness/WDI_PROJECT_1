// OutLine__________________________________________________

//Blocks to dynamically appear out of frame, and fall vertically
//Block to contain randomly selected word.
//Blocks to disappear if that word its typed in the input box.
//10 points are awarded for every correctly spelt word.
//Game over if blocks hit the floor.

// MVP______________________________________________________

//Blocks fall at consistant pace at semi-random intervals (i.e. one every 3-6 seconds).
//An array of easy, medium and hard words are stored and after the user completed (x) number of words, the difficulty of the words appearing increases.
//Increment score for every word completed.
//Game over if the blocks hit the floor.

//Extra_____________________________________________________

//Highlight correctly inputted letters green.
//Increase the $speed of falling.
//Give blocks aethetic styling.
//Allow for score to be stored as highscore (while browser isnt refreshed).
//Create game name and logo.

//PsuedoCode________________________________________________

//Blocks of fixed width and height appear at random intervals and y positions and fall.
//Y positioning determined by 'left': $positionX+'px` where $positionX is determined by math.random multiplied by the width of the game screen minus the width of the block.
// Falling $speed is based on level and is determined at an increment based on this.
// Speed will equal ~(max-interval) - math.random x level~

//Code_____________________________________________________
var wordGame = wordGame || {};

//______________________________________________________________________
//SetUp --- This function should define the inititial state for the game.
wordGame.setUp = function(){

  //Storing all final scores in an array allows for the storage of the highest score.
  this.scoreArray = [];

  //create a new button on start up called 'start' that if clicked envokes 'newgame'
  this.$startButton = $('<div id = "start"/>').appendTo('.startBtn').text('START');

  this.$startButton.on('click', function(){
    //onclick, the start button envokes newgame and fades the grey cover.
    $('.cover').fadeOut(2000);
    wordGame.newGame();
    //click button is removed from the DOM once clicked.
    wordGame.$startButton.remove();
  });
};

//_________________________________________________________________
//NewGame defines the initial requirements for a new game. Separated from setUp so that it can be accessed by 'play again' rather than start.
wordGame.newGame = function(){

  //Automatically focuses on the text box once the game starts
  $('input').focus();

  //set score to 0
  this.score = 0;

  this.level = $('.level');

  this.thisBlock = $('.block');

  //Set the score back to 0 if it isn't already
  $('.score').text(`${this.score}`);

  //Define the arrays of words in each category. (As these get pulled into the DOM at random they reduce in size, therefore need to be declared before the game gets restarted.)
  this.easy = ['all','am','and','ball','be','bed','big','book','box','boy','but','came','can','car','cat','come','cow','dad','day','did','dog','fat','for','fun','get','good','got','had','hat','hen','here','him','his','home','hot','into','let','like','look','man','may','mum','not','old','one','out','pan','pet','pig','play','ran','rat','red','ride','run','sat','see','she','sit','six','stop','sun','ten','the','this','top','toy','two','was','will','yes','you'];

  this.medium = ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh', 'tiger', 'faith', 'earth', 'river', 'money', 'peace', 'forty', 'words', 'smile', 'abate', 'house', 'alone', 'watch', 'lemon', 'South', 'erica', 'anime', 'after', 'santa', 'women'];

  this.hard = ['TOENAIL', 'ELATION', 'ROUTINE', 'ATONIES', 'OUTEARN', 'URINATE', 'URANITE', 'TAURINE', 'RUINATE', 'ALIENOR', 'AILERON', 'ERASION', 'TRENAIL', 'RETINAL', 'RELIANT', 'RATLINE', 'LATRINE', 'ANEROID', 'TRAINEE', 'RETINAE', 'ARENITE', 'INERTIA', 'AEOLIAN', 'TRAINED', 'DETRAIN', 'ANTIRED', 'NIOBATE', 'ACONITE', 'RONDEAU', 'RAINOUT', 'NEUROID', 'DOURINE', 'URANIDE', 'UNAIRED', 'STONIER', 'ORIENTS', 'OESTRIN', 'NORITES', 'ENATION', 'ALEURON', 'STEARIN', 'STAINER', 'RETSINA', 'RETINAS', 'RETAINS', 'RATINES', 'NASTIER', 'ANTSIER', 'ANESTRI', 'ALUNITE', 'ALIENER', 'TREASON', 'SENATOR', 'ATONERS', 'OUTLIER', 'ROMAINE', 'NEUTRAL', 'MORAINE', 'AIRLINE', 'REGINAE', 'NITERIE', 'UTERINE', 'REUNITE', 'RETINUE', 'OUTLINE', 'ELUTION', 'DENARII', 'TORULAE', 'INEDITA', 'RETINOL', 'DIATRON', 'TEARING', 'TANGIER', 'REPAINT', 'PERTAIN', 'PAINTER', 'LINEATE', 'INGRATE', 'GRATINE', 'GRANITE', 'AMNIOTE', 'RATIONS', 'FOLIATE', 'AROINTS', 'ARENOUS', 'URINOSE', 'TRAILED', 'REDTAIL', 'ETESIAN', 'DILATER', 'URALITE', 'SOUTANE', 'DARIOLE', 'AUDIENT', 'OUTLAIN', 'EROTICA', 'ENTRAIN', 'VIOLATE', 'UNITIES', 'ENACTOR'
  ];

//Ensuring the arrays are empty. This is where words get pulled once randomly selected.
  this.usedWordArray = [];

//Display the level label.
  $('.levelLabel').css('display', 'block');

// Envoke the randomValues function which randomises the values for $speed, interval and position
  this.randomValues();

//this function envokes the submitText and backgroundChange functions 10 times a seccond.
  this.checkText = setInterval(function(){
    wordGame.submitText();
    wordGame.backgroundChange();
    wordGame.positionCheck();
  },100);

//ensures once the above has been executed stops
  return this.newGame;

};

//_______________________________________________________________________
//randomValues is a function to assign random values to the variables that make the game dynamic
wordGame.randomValues = function(){
  //$speed can be anything between 9000 and 12000
  this.$speed = Math.floor(Math.random()*3000+9000);
  //interval can be anything between 800 and 2800
  this.$interval = Math.floor(Math.random()*2000+800);
  //the X axis position of the blocks can fall anywhere within the width of the users window.
  this.$positionX = Math.floor(Math.random()*($(window).width()-150));

  //blockTimer uses the generated value for interval to intermittently introduce a new block
  this.blockTimer = setTimeout(function () {
//create a 'block' as a div appended to the element '.space'.
    wordGame.$block = $('<div/>').appendTo('.space').addClass(`block`);
    wordGame.giveAttribute();
  }, wordGame.$interval);

};

//_____________________________________________________________________
//giveAttribute assigns value to each block based on an if statement looking for the length of the three levels arrays.
wordGame.giveAttribute = function(){

  //Re-envoke randomValues to generate a different set of properties for the following block.
  this.randomValues();

//_______EASY___________________________________________________________
//if statement defines which array to pull words from and assigns the word to the block.
//Each statement will continue until the level array is less than the value stated.
  if(this.easy.length >= 60){
//Find a word from the easy array at random.
    this.$easyIndex = Math.floor(Math.random()*((this.easy).length));
//store that word as '$currentEasyWord'
    this.$currentEasyWord = this.easy[this.$easyIndex];
//delete the element at the position of $easyIndex
    this.easy.splice(this.$easyIndex, 1);
//Push the $currentEasyWord to the usedWordArray in upperCase.
    this.usedWordArray.push(this.$currentEasyWord.toUpperCase());
//assign the last word in the usedWordArray to the block
    this.$blockWord = this.usedWordArray[this.usedWordArray.length-1];
//introduce the block to the window by animating it at speed (this.$speed) and at position (positionX).
    this.$block.css({'left': this.$positionX+'px', 'background-color': '#F7CB15'}).html(`${this.$blockWord}`).animate({'margin-top': `${$(window).height()}`},this.$speed);

//________MEDIUM________________________________________________________
//If the easy array is less than 60 elements long, the following will run.
  }else if (this.medium.length >= 28) {
//at this stage the user is on level 2, therefore update the text in the .level class to '2'
    this.level.text('2');
//Find a word from the medium array at random.
    wordGame.$mediumIndex = Math.floor(Math.random()*(wordGame.medium).length);
//store that word as '$currentMedWord'
    wordGame.$currentMedWord = wordGame.medium[wordGame.$mediumIndex];
//delete the element at the position of $mediumIndex
    wordGame.medium.splice(wordGame.$mediumIndex, 1);
//Push the $currentMedWord to the usedWordArray in upperCase.
    wordGame.usedWordArray.push(wordGame.$currentMedWord.toUpperCase());
//assign the last word in the usedWordArray to the block
    wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
//introduce the block to the window by animating it at speed ($speed) and at position (positionX).
    wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#878E88'}).html(`${wordGame.$blockWord}`).animate({'margin-top': `${$(window).height()}`},wordGame.$speed);

//________HARD__________________________________________________________
//If the med array is less than 28 elements long, the following will run.
  } else if (this.hard.length > 0) {
//Update the value of .level to '3'
    this.level.text('3');
//Find a word from the hard array at random.
    wordGame.$hardIndex = Math.floor(Math.random()*(wordGame.hard).length);
//store that word as '$currentHardWord'
    wordGame.$currentHardWord = wordGame.hard[wordGame.$hardIndex];
//delete the element at the position of $hardIndex
    wordGame.hard.splice(wordGame.$hardIndex, 1);
//Push the $currentHardWord to the usedWordArray in upperCase.
    wordGame.usedWordArray.push(wordGame.$currentHardWord.toUpperCase());
//assign the last word in the usedWordArray to the block
    wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
//introduce the block to the window by animating it at speed ($speed) and at position (positionX).
    wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#F45D01'}).html(`${wordGame.$blockWord}`).animate({'margin-top': `${$(window).height()}`},wordGame.$speed);

//if all else is untrue - end the game.
  }else(this.end());
  return this.giveAttribute;
};

//_________________________________________________________________________
//the change background functino looks to change the background based on level
wordGame.backgroundChange = function(){
  if (this.level.text() === '2'){
    $('.cover').css('background-color', '#ff9966').fadeIn(4000);
  }else if (this.level.text() === '3'){
    $('.coverTwo').css('background-color', '#4B738E').fadeIn(4000);
  }
};

//_________________________________________________________________________
//positionCheck will clear the interval if there are no blocks in the system but will check the top offset of the blocks and will remove all blocks if any fall below 120 from the bottom of the user window.
wordGame.positionCheck = function(){
  if($('.block').length === 0){
    clearInterval(this.check);
  }else if ($('.block').offset().top >= `${$(window).height()-120}`){
    $(`.block`).remove();
    wordGame.end();
  }
  return;
};

//_________________________________________________________________________
//submitText checks for the user input in the text field
wordGame.submitText = function(){
//create a new array that splits the first (or oldest) block words into letters.
  this.$letterArray = $('.block').first().text().split('');
//change the oldest block to be highlighted
  $('.block').first().css({'background-color': '#963484'});

  this.inputText = $('.input');
//if statement to check the first value of the highlighted words with the input text value.
  if(this.$letterArray[0] === this.inputText.val().toUpperCase()){
//if it matches, play a typing sound
    new Audio('sounds/type_correct.mp3').play();
//empty text box.
    this.inputText.val('');
//remove the letter from the letterArray
    this.$letterArray.shift();
//update the blockWord to equal the letters in the updated letterArray
    this.$blockWord = this.$letterArray.join().replace(/,/g, '');
//add one to the score if correct letter inputted
    this.score++;
//update the score value to the user.
    $('.score').text(`${this.score}`);
//update the highlighted block word to the user (minus the correct letter inputted)
    $('.block').first().text(`${this.$blockWord}`);
  }else if($('.block').length === 0){
//if there are no blocks, log loading...
    console.log('loading');
  }else if(this.$letterArray.length === 0){
//if all letters have been removed from the letterArray, delete block
    $('.block').first().remove();
//create and play popping sound
    new Audio('sounds/Blop-Mark_DiAngelo-79054334.wav').play();
//Delete contects in input box
    this.inputText.val('');
  }else if(this.$letterArray[0] !== this.inputText.val().toUpperCase()){
    // new Audio('sounds/wrong_answer.mp3').play();
    this.inputText.val('');
  }
};

//____________________________________________________________________
//The end functionm defines the game over logic
wordGame.end = function(){
//reset the level to 1
  this.level.text('1');
//hide the level label
  $('.levelLabel').css('display', 'none');
//fadeout coverTwo if it is shown.
  $('.coverTwo').fadeOut(2000);
//change the cover to be grey and shown
  $('.cover').css({'background-color': 'rgba(179, 179, 179, 0.8)', 'display': 'block'}).fadeIn(2000);
//delete all blocks
  this.$block.remove();
//clear all timers and intervals
  clearInterval(wordGame.check);
  clearInterval(wordGame.checkText);
  clearTimeout(wordGame.blockTimer);
//push the score achieve by the user in this round to the scoreArray
  this.scoreArray.push(this.score);
//locate the highest score in the scoreArray and store it as highScore
  this.highScore = Math.max.apply(Math,this.scoreArray);
//create a new div call over and have it say GAME OVER
  this.$gameOver = $('<div id = "over"/>').appendTo('.startBtn').text('GAME OVER');
//create a new div called highScore and get it to show the value for highScore
  this.$highScore = $('<div id = "highScore"/>').appendTo('.startBtn').text(`HIGH SCORE: ${this.highScore}`);
//show a playAgain button that follows the same logic as the start button
  this.$playAgain = $('<div id = "start"/>').appendTo('.startBtn').text('PLAY AGAIN');
//on click of the play again button...
  this.$playAgain.on('click', function(){
//fade out cover to show basic background.
    $('.cover').fadeOut(2000);
//envoke newGame to set all initial values.
    wordGame.newGame();
//remove all created divs.
    wordGame.$playAgain.remove();
    wordGame.$gameOver.remove();
    wordGame.$highScore.remove();
  });

  return this.end;
};

$(wordGame.setUp.bind(wordGame));
