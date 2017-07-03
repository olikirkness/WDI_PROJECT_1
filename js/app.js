// $(init);
//
//
//
// function init(){
//   console.log('');
//   createBlock();
// }
//
//
//
//
// function createBlock(){
//
//   const $positionX = Math.floor(Math.random()*300);
//   const $block = $('<div/>').appendTo('.space').addClass('block');
//   console.log($positionX);
//   $block.css({'left': $positionX+'px'}).text('hello').animate({'margin-top': '460px'},5000);
//   test();
//
// }
//
// function test(){
//   checkBlockPosition();
// }
//
//
//
// function checkBlockPosition(){
//
//
//
//   var $blockPosition = $('div.block').offset();
//
//
// setInterval(function(){
//     $('p').text('top' + $blockPosition.top);
//     if( $blockPosition.top > 209){
//       this.remove();
//       next();
//       clear();
//       console.log('hello')
//     }
//     },100);
//
//
//
//   $('.block').on('click', function(){
//     $(this).remove();
//   });
//
//   function next(){
//     if ($('div.block').length ){
//       console.log('still here');
//
//     }else {
//       this.remove();
//       clear();
//       console.log('hello');
//     }
//   }
//
//   function clear(){
//     clearInterval();
//   }
//
// }



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
//Increase the speed of falling.
//Give blocks aethetic styling.
//Allow for score to be stored as highscore (while browser isnt refreshed).
//Create game name and logo.

//PsuedoCode________________________________________________

//Blocks of fixed width and height appear at random intervals and y positions and fall.
//Y positioning determined by 'left': $positionX+'px` where $positionX is determined by math.random multiplied by the width of the game screen minus the width of the block.
// Falling speed is based on level and is determined at an increment based on this.
// Speed will equal ~(max-interval) - math.random x level~

//Code______________________________________________________


var wordGame = wordGame || {};

//SetUp --- This function should define the inititial state for the game.

wordGame.setUp = function(){

  this.$startButton = $('<div id = "start"/>').appendTo('.startBtn').text('START');

  this.$startButton.on('click', function(){
    $('.cover').fadeOut(2000);
    wordGame.newGame();
    wordGame.$startButton.remove();
  });
};

//NewGame defines the initial requirements for a new game. Separated from setUp so that it can be accessed by 'play again' rather than start.

wordGame.newGame = function(){

//defining variables that will be available globally and will later be randomised
  this.interval = 0;
  this.speed = 0;
  this.score = 0;

//Set the score back to 0 if it isn't already
  $('.score').text(`${this.score}`);

//Define the arrays of words in each category. (as these get pulled into the DOM at random, reduce in size, therefore need to be declared before the game gets restarted.)
  this.easy = ['all','am','and','ball','be','bed','big','book','box','boy','but','came','can','car','cat','come','cow','dad','day','did','dog','fat','for','fun','get','good','got','had','hat','hen','here','him','his','home','hot','into','let','like','look','man','may','mum','not','old','one','out','pan','pet','pig','play','ran','rat','red','ride','run','sat','see','she','sit','six','stop','sun','ten','the','this','top','toy','two','was','will','yes','you'];

  this.medium = ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh', 'tiger', 'faith', 'earth', 'river', 'money', 'peace', 'forty', 'words', 'smile', 'abate', 'house', 'alone', 'watch', 'lemon', 'South', 'erica', 'anime', 'after', 'santa', 'women'];

  this.hard = ['TOENAIL', 'ELATION', 'ROUTINE', 'ATONIES', 'OUTEARN', 'URINATE', 'URANITE', 'TAURINE', 'RUINATE', 'ALIENOR', 'AILERON', 'ERASION', 'TRENAIL', 'RETINAL', 'RELIANT', 'RATLINE', 'LATRINE', 'ANEROID', 'TRAINEE', 'RETINAE', 'ARENITE', 'INERTIA', 'AEOLIAN', 'TRAINED', 'DETRAIN', 'ANTIRED', 'NIOBATE', 'ACONITE', 'RONDEAU', 'RAINOUT', 'NEUROID', 'DOURINE', 'URANIDE', 'UNAIRED', 'STONIER', 'ORIENTS', 'OESTRIN', 'NORITES', 'ENATION', 'ALEURON', 'STEARIN', 'STAINER', 'RETSINA', 'RETINAS', 'RETAINS', 'RATINES', 'NASTIER', 'ANTSIER', 'ANESTRI', 'ALUNITE', 'ALIENER', 'TREASON', 'SENATOR', 'ATONERS', 'OUTLIER', 'ROMAINE', 'NEUTRAL', 'MORAINE', 'AIRLINE', 'REGINAE', 'NITERIE', 'UTERINE', 'REUNITE', 'RETINUE', 'OUTLINE', 'ELUTION', 'DENARII', 'TORULAE', 'INEDITA', 'RETINOL', 'DIATRON', 'TEARING', 'TANGIER', 'REPAINT', 'PERTAIN', 'PAINTER', 'LINEATE', 'INGRATE', 'GRATINE', 'GRANITE', 'AMNIOTE', 'RATIONS', 'FOLIATE', 'AROINTS', 'ARENOUS', 'URINOSE', 'TRAILED', 'REDTAIL', 'ETESIAN', 'DILATER', 'URALITE', 'SOUTANE', 'DARIOLE', 'AUDIENT', 'OUTLAIN', 'EROTICA', 'ENTRAIN', 'VIOLATE', 'UNITIES', 'ENACTOR'
  ];

//Use this bonus array between levels - using different logic.
  this.bonus = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//Ensuring the arrays are empty
  this.usedBonusArray = [];
  this.usedWordArray = [];

// Envoke the randomTime function randomises the values for speed, interval and position
  this.randomTime();

  return this.newGame;

};

//the function randomTime is a function to assign random values to the variables.
wordGame.randomTime = function(){

//speed can be anything between 10000 and 12000
  this.speed = Math.floor(Math.random()*2000+10000);
//interval can be anything between 1000 and 30000
  this.interval = Math.floor(Math.random()*2000+1000);
//the X axis position of the blocks can vary from 0 to 350
  this.$positionX = Math.floor(Math.random()*350);



//timer uses the generated value for interval to intermittently introduce a new block
//TEST THIS USING SET TIMEOUT
  this.timer = setTimeout(function () {

    wordGame.giveAttribute();

  }, wordGame.interval);

  //ensure the check function is cleared.
  clearInterval(this.check);

  return this.randomTime;
};




wordGame.giveAttribute = function(){

  clearInterval(this.timer);

  this.randomTime();
  this.submitText();


  if(this.easy.length >= 68){

    this.easyTimer = setTimeout(function(){
      wordGame.positionCheck();
      wordGame.$block = $('<div/>').appendTo('.space').addClass(`block`);
      wordGame.$easyIndex = Math.floor(Math.random()*((wordGame.easy).length));
      wordGame.$currentEasyWord = wordGame.easy[wordGame.$easyIndex];
      wordGame.easy.splice(wordGame.$easyIndex, 1);
      wordGame.usedWordArray.push(wordGame.$currentEasyWord.toUpperCase());
      wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
      wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#F7CB15'}).html(`${wordGame.$blockWord}`).animate({'margin-top': '660px'},wordGame.speed);
      return;
    },1000);

  }
  // else if(this.bonus.length >15){
  //
  //   this.bonusText();
  //   this.easyTimer = setTimeout(function(){
  //
  //     wordGame.$bonusIndex = Math.floor(Math.random()*((wordGame.bonus).length));
  //     wordGame.$currentBonusWord = wordGame.bonus[wordGame.$bonusIndex];
  //     wordGame.bonus.splice(wordGame.$bonusIndex, 1);
  //     wordGame.usedBonusArray.push(wordGame.$currentBonusWord.toUpperCase());
  //     wordGame.$blockWord = wordGame.usedBonusArray[wordGame.usedBonusArray.length-1];
  //     wordGame.$block = $('<div/>').appendTo('.space').addClass(`${wordGame.$blockWord} block`);
  //     wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': 'black'}).html(`${wordGame.$blockWord}`).animate({'margin-top': '660px'},10000);
  //     return;
  //   },3000);
  // }
  else if (this.medium.length >= 43) {


    this.medTimer = setTimeout(function(){
      clearInterval(this.check);
      wordGame.positionCheck();
      wordGame.$block = $('<div/>').appendTo('.space').addClass(`block`);

      wordGame.$mediumIndex = Math.floor(Math.random()*(wordGame.medium).length);
      wordGame.$currentMedWord = wordGame.medium[wordGame.$mediumIndex];
      wordGame.medium.splice(wordGame.$mediumIndex, 1);
      wordGame.usedWordArray.push(wordGame.$currentMedWord.toUpperCase());
      wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
      wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#878E88'}).html(`${wordGame.$blockWord}`).animate({'margin-top': '640px'},wordGame.speed);

      return;

    },2000);


  } else if (this.hard.length > 0) {


    this.hardTimer = setTimeout(function(){
      clearInterval(this.check);
      wordGame.positionCheck();
      wordGame.$block = $('<div/>').appendTo('.space').addClass(`block`);
      console.log(`hard ${wordGame.hard.length}`);
      wordGame.$hardIndex = Math.floor(Math.random()*(wordGame.hard).length);
      wordGame.$currentHardWord = wordGame.hard[wordGame.$hardIndex];
      wordGame.hard.splice(wordGame.$hardIndex, 1);
      wordGame.usedWordArray.push(wordGame.$currentHardWord.toUpperCase());
      wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
      wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#F45D01'}).html(`${wordGame.$blockWord}`).animate({'margin-top': '640px'},wordGame.speed);
      console.log(wordGame.usedWordArray);
      return;

    },2500);

  }

  return this.giveAttribute;

};



wordGame.positionCheck = function(){

  this.check = setInterval(function(){
    if ($('.block').offset().top >= 540){
      $(`.block`).remove();
      wordGame.end();
    }
  }, 100);
  return;
};

// wordGame.bonusText = function(){
//   this.inputText = $('.input');
//
//
//   if(this.inputText.val().toUpperCase() === this.usedBonusArray[0]){
//     $(`#${wordGame.$blockWord}`).remove();
//     this.score++;
//     $('.score').text(`${this.score}`);
//
//     this.usedBonusArray.shift();
//     this.inputText.val('');
//
//   }
// };


wordGame.submitText = function(){
  console.log(this.$blockId);
  this.inputText = $('.input');
  console.log(this.inputText.val());

  if(this.inputText.val().toUpperCase() === this.usedWordArray[0]){
    this.score++;
    $('.score').text(`${this.score}`);
    $('.block').first().remove();
    console.log('correct!');
    this.usedWordArray.shift();
    this.inputText.val('');
    console.log(this.usedWordArray);

  }
};

wordGame.end = function(){
  $('.cover').fadeIn(2000);
  this.$block.remove();
  clearInterval(wordGame.check);
  clearTimeout(wordGame.timer);
  clearTimeout(wordGame.easyTimer);
  clearTimeout(wordGame.medTimer);
  clearTimeout(wordGame.hardTimer);

  this.$gameOver = $('<div id = "over"/>').appendTo('.startBtn').text('GAME OVER');
  this.$startButton = $('<div id = "start"/>').appendTo('.startBtn').text('PLAY AGAIN');

  this.$startButton.on('click', function(){
    $('.cover').fadeOut(2000);
    wordGame.newGame();
    wordGame.$startButton.remove();
    wordGame.$gameOver.remove();
  });

  return this.end;
};

$(wordGame.setUp.bind(wordGame));
