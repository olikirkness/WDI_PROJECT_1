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
  this.randomTime();
  this.interval = 1000;
  this.speed = 5000;
  this.easy = ['all','am','and','at','ball','be','bed','big','book','box','boy','but','came','can','car','cat','come','cow','dad','day','did','do','dog','fat','for','fun','get','go','good','got','had','hat','he','hen','here','him','his','home','hot','if','in','into','is','it','its','let','like','look','man','may','me','mom','my','no','not','of','oh','old','on','one','out','pan','pet','pig','play','ran','rat','red','ride','run','sat','see','she','sit','six','so','stop','sun','ten','the','this','to','top','toy','two','up','us','was','we','will','yes','you'];

  this.medium = ['uidfiw', 'onwdnf', 'haionoidnveft', 'iowef', 'odnfs', 'onfwfo', 'iojfn', 'njwf', 'ojfnwe', 'jwdofwf', 'onwoff'];

  this.usedWordArray = [];
  this.blockArray = [];
  this.$blockId = 0;
};

//RandomTime --- This function defines

wordGame.randomTime = function(){
  this.speed = Math.floor(Math.random()*1000+4000);
  this.interval = Math.floor(Math.random()*2000+4000);
  this.$positionX = Math.floor(Math.random()*350);
  this.timer = setTimeout(function () {

    wordGame.createBlock();
    // wordGame.positionCheck();
  }, wordGame.interval);
};

wordGame.createBlock = function(){



  console.log(this.$blockId);
  $('.level').text('');

  this.giveAttribute();


};

wordGame.giveAttribute = function(){
  clearInterval(this.timer);

  this.randomTime();
  this.submitText();


  if(this.easy.length >= 88){

    setTimeout(function(){
      wordGame.$block = $('<div/>').appendTo('.space').addClass(`${wordGame.$blockId} block`);
      console.log(wordGame.$blockId);
      console.log(`easy ${wordGame.easy.length}`);
      wordGame.$easyIndex = Math.floor(Math.random()*((wordGame.easy).length));
      wordGame.$currentEasyWord = wordGame.easy[wordGame.$easyIndex];
      wordGame.easy.splice(wordGame.$easyIndex, 1);
      wordGame.usedWordArray.push(wordGame.$currentEasyWord.toUpperCase());
      wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];

      wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#F7CB15'}).html(`${wordGame.$blockWord}`).animate({'margin-top': '660px'},wordGame.speed);
      console.log(wordGame.usedWordArray);
      return;
    },4000);

  }else if (this.medium.length > 0) {



    setTimeout(function(){
      wordGame.$block = $('<div/>').appendTo('.space').addClass(`${this.$blockId} block`);

      console.log(wordGame.$mediumIndex);
      console.log(`medium ${wordGame.medium.length}`);
      wordGame.$mediumIndex = Math.floor(Math.random()*(wordGame.medium).length);
      wordGame.$currentMedWord = wordGame.medium[wordGame.$mediumIndex];
      wordGame.$blockWord = wordGame.usedWordArray[wordGame.usedWordArray.length-1];
      wordGame.usedWordArray.push(wordGame.$currentMedWord.toUpperCase());
      wordGame.$block.css({'left': wordGame.$positionX+'px', 'background-color': '#878E88'}).text(`${wordGame.$currentMedWord}`).animate({'margin-top': '660px'},wordGame.speed);
      wordGame.medium.splice(wordGame.$mediumIndex, 1);

      console.log(wordGame.usedWordArray);
      return;

    },4000);


  } else{
    console.log('finished');
    this.end();
    clearInterval(this.timer);
    return;

  }


};



// wordGame.positionCheck = function(){
//   if ($('div.block').offset().top >= 300){
//     console.log('hello');
//     this.$block.css('background-color', 'blue');
//   }
//
// };

wordGame.submitText = function(){
  console.log(this.$blockId);
  this.inputText = $('.input');
  console.log(this.inputText.val());

  if(this.inputText.val().toUpperCase() === this.usedWordArray[0]){
    $(`.${this.$blockId}.block`).remove();
    console.log('correct!');
    this.usedWordArray.shift();
    this.inputText.val('');
    console.log(this.usedWordArray);
    this.$blockId++;
    console.log(`.${this.$blockId}`);
  }

//   if(e.keyCode === 13){
//     console.log('hello');
//     return false;
//   }
};

wordGame.end = function(){
  console.log('game over');
  clearInterval(this.timer);
  return;
};

$(wordGame.setUp.bind(wordGame));
