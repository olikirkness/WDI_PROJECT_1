
var wordGame = wordGame || {};
wordGame.setUp = function(){

  this.inputBox = $('<input type="text" class="input" onkeypress="wordGame.submitText(event)"/>').appendTo('body');
  this.scoreLabel = $('<p class="scoreLabel"/>').appendTo('body').text('Score: ');
  this.scoreSpan = $('<span class="score"/>').appendTo('.scoreLabel').text('0');
  this.levelLabel = $('<p class="levelLabel"/>').appendTo('body').text('Level: ');
  this.levelSpan = $('<span class="level"/>').appendTo('.levelLabel').text('1');
  this.space = $('<div class="space"/>').appendTo('body');
  this.startBtn = $('<div class="startBtn"/>').appendTo('.space');
  this.gameOver = $('<div class="gameOver"/>').appendTo('.space');
  this.top = $('<div class="top"/>').appendTo('.space');
  this.base = $('<div class="base"/>').appendTo('.space');
  this.sun = $('<div class="sun"/>').appendTo('.space');

  this.$startButton = $('<div id = "start"/>').appendTo('.startBtn').text('START');
  this.$startButton.on('click', function(){
    wordGame.newGame();
    wordGame.$startButton.remove();
  });
};

wordGame.newGame = function(){
  console.log(this);

  this.easy = ['all','am','and','ball','be','bed','big','book','box','boy','but','came','can','car','cat','come','cow','dad','day','did','dog','fat','for','fun','get','good','got','had','hat','hen','here','him','his','home','hot','into','let','like','look','man','may','mum','not','old','one','out','pan','pet','pig','play','ran','rat','red','ride','run','sat','see','she','sit','six','stop','sun','ten','the','this','top','toy','two','was','will','yes','you','able','acid','aged','also','area','army','away','baby','back','ball','band','bank','base','bath','bear','beat','been','beer','bell','belt','best','bill','bird','blow','blue','boat','body','bomb','bond','bone','book','boom','born','boss','both','bowl','bulk','burn','bush','busy','call','calm','came','camp','card','care','case','cash','cast','cell','chat','chip','city','club','coal','coat','code','cold','come','cook','cool','cope','copy','CORE','cost','crew','crop','dark','data','date','dawn','days','dead','deal','dean','dear','debt','deep','deny','desk','dial','dick','diet','disc','disk','does','done','door','dose','down','draw','drew','drop','drug','dual','duke','dust','duty','each','earn','ease','east','easy','edge','else','even','ever','evil','exit','face','fact','fail','fair','fall','farm','fast','fate','fear','feed','feel','feet','fell','felt','file','fill','film','find','fine','fire','firm','fish','five','flat','flow','food','foot','ford','form','fort','four','free','from','fuel','full','fund','gain','game','gate','gave','gear','gene','gift','girl','give','glad','goal','goes','gold','Golf','gone','good','gray','grew','grey','grow','gulf','hair','half','hall','hand','hang','hard','harm','hate','have','head','hear','heat','held','hell','help','here','hero','high','hill','hire','hold','hole','holy','home','hope','host','hour','huge','hung','hunt','hurt','idea','inch','into','iron','item','jack','jane','jean','john','join','jump','jury','just','keen','keep','kent','kept','kick','kill','kind','king','knee','knew','know','lack','lady','laid','lake','land','lane','last','late','lead','left','less','life','lift','like','line','link','list','live','load','loan','lock','logo','long','look','lord','lose','loss','lost','love','luck','made','mail','main','make','male','many','Mark','mass','matt','meal','mean','meat','meet','menu','mere','mike','mile','milk','mill','mind','mine','miss','mode','mood','moon','more','most','move','much','must','name','navy','near','neck','need','news','next','nice','nick','nine','none','nose','note','okay','once','only','onto','open','oral','over','pace','pack','page','paid','pain','pair','palm','park','part','pass','past','path','peak','pick','pink','pipe','plan','play','plot','plug','plus','poll','pool','poor','port','post','pull','pure','push','race','rail','rain','rank','rare','rate','read','real','rear','rely','rent','rest','rice','rich','ride','ring','rise','risk','road','rock','role','roll','roof','room','root','rose','rule','rush','ruth','safe','said','sake','sale','salt','same','sand','save','seat','seed','seek','seem','seen','self','sell','send','sent','sept','ship','shop','shot','show','shut','sick','side','sign','site','size','skin','slip','slow','snow','soft','soil','sold','sole','some','song','soon','sort','soul','spot','star','stay','step','stop','such','suit','sure','take','tale','talk','tall','tank','tape','task','team','tech','tell','tend','term','test','text','than','that','them','then','they','thin','this','thus','till','time','tiny','told','toll','tone','tony','took','tool','tour','town','tree','trip','true','tune','turn','twin','type','unit','upon','used','user','vary','vast','very','vice','view','vote','wage','wait','wake','walk','wall','want','ward','warm','wash','wave','ways','weak','wear','week','well','went','were','west','what','when','whom','wide','wife','wild','will','wind','wine','wing','wire','wise','wish','with','wood','word','wore','work','yard','yeah','year','your','zero','zone'];

  this.medium = ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'Angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'Kelly', 'mouth', 'woman', 'sugar', 'amber', 'dream', 'apple', 'laugh', 'tiger', 'faith', 'earth', 'river', 'money', 'peace', 'forty', 'words', 'smile', 'abate', 'house', 'alone', 'watch', 'lemon','South','erica','anime','after','santa','women','aboard','absorb','afghan','assign','cement','chorus','cleave','cornea','crunch','debris','delved','drawer','duress','easily','embryo','exotic','eyelet','facade','fedora','fronds','genius','giggle','gossip','helmet','heroic','kidney','loathe','mallet','mortar','murmur','nephew','parody','peruse','ponder','racial','ransom','rascal','realty','reason','reckon','relish','rugged','scythe','sequel','shovel','simmer','sourly','stench','talons','tiring','tissue','virtue','weasel','widget','wizard','wombat'];

  this.hard = ['TOENAIL', 'ELATION', 'ROUTINE', 'ATONIES', 'OUTEARN', 'URINATE', 'URANITE', 'TAURINE', 'RUINATE', 'ALIENOR', 'AILERON', 'ERASION', 'TRENAIL', 'RETINAL', 'RELIANT', 'RATLINE', 'LATRINE', 'ANEROID', 'TRAINEE', 'RETINAE', 'ARENITE', 'INERTIA', 'AEOLIAN', 'TRAINED', 'DETRAIN', 'ANTIRED', 'NIOBATE', 'ACONITE', 'RONDEAU', 'RAINOUT', 'NEUROID', 'DOURINE', 'URANIDE', 'UNAIRED', 'STONIER', 'ORIENTS', 'OESTRIN', 'NORITES', 'ENATION', 'ALEURON', 'STEARIN', 'STAINER', 'RETSINA', 'RETINAS', 'RETAINS', 'RATINES', 'NASTIER', 'ANTSIER', 'ANESTRI', 'ALUNITE', 'ALIENER', 'TREASON', 'SENATOR', 'ATONERS', 'OUTLIER', 'ROMAINE', 'NEUTRAL', 'MORAINE', 'AIRLINE', 'REGINAE', 'NITERIE', 'UTERINE', 'REUNITE', 'RETINUE', 'OUTLINE', 'ELUTION', 'DENARII', 'TORULAE', 'INEDITA', 'RETINOL', 'DIATRON', 'TEARING', 'TANGIER', 'REPAINT', 'PERTAIN', 'PAINTER', 'LINEATE', 'INGRATE', 'GRATINE', 'GRANITE', 'AMNIOTE', 'RATIONS', 'FOLIATE', 'AROINTS', 'ARENOUS', 'URINOSE', 'TRAILED', 'REDTAIL', 'ETESIAN', 'DILATER', 'URALITE', 'SOUTANE', 'DARIOLE', 'AUDIENT', 'OUTLAIN', 'EROTICA', 'ENTRAIN', 'VIOLATE', 'UNITIES','ENACTOR','Thirteen','Thursday','Princess','Thousand','Fourteen','Language','Chipotle','American','Business','Favorite','Elephant','Children','Birthday','Mountain','Feminine','Football','Kindness','Syllable','Abdicate','Treasure','Envelope','Strength','Together','Memories','Darkness','February','Sandwich','Calendar','Bullying','Equation','Violence','Marriage','Building','Internal','Function','November','Drooping','Victoria','Squirrel','Tomorrow','Champion','Sentence','Personal','Remember','Daughter','Hospital', 'Ordinary','Medicine'];


  this.space.css('background-color', '#7ec0ee');
  this.sun.css('margin', '-180px 180px');

  this.life1 = $('<img class = "life" id = "life1" src="http://i.imgur.com/9yl5zM8.png"/>').appendTo('.top');
  this.life2 = $('<img class = "life" id = "life2" src="http://i.imgur.com/9yl5zM8.png"/>').appendTo('.top');
  this.life3 = $('<img class = "life" id = "life3" src="http://i.imgur.com/9yl5zM8.png"/>').appendTo('.top');

  this.inputBox.focus().val('');
  this.lives = 3;
  this.score = 0;
  this.level = $('.level');
  this.delayCount = 1;
  this.scoreSpan.text(`${this.score}`);

  this.usedWordArray = [];

  this.levelLabel.css('display', 'block');

  this.randomValues();

  this.checkText = setInterval(function(){
    wordGame.submitText();
    wordGame.backgroundChange();
    wordGame.positionCheck();
  },100);

};

wordGame.randomValues = function(){
  this.$speed = Math.floor(Math.random()*3000+12000);
  this.$interval = Math.floor(Math.random()*1500+800);
  this.$positionX = Math.floor(Math.random()*($(window).width()-150));
  this.blockTimer = setTimeout(function () {
    wordGame.$block = $('<div/>').appendTo('.space').addClass(`block`);
    wordGame.giveAttribute();
  }, wordGame.$interval);
};

wordGame.giveAttribute = function(){

  this.randomValues();

  if(this.easy.length >= 545){
    this.$easyIndex = Math.floor(Math.random()*((this.easy).length));
    this.$currentEasyWord = this.easy[this.$easyIndex];
    this.easy.splice(this.$easyIndex, 1);
    this.usedWordArray.push(this.$currentEasyWord.toUpperCase());
    this.$blockWord = this.usedWordArray[this.usedWordArray.length-1];
    this.$block.css({'left': this.$positionX+'px', 'background-color': '#60c426'}).html(`${this.$blockWord}`).animate({'margin-top': `${$(window).height()}`},this.$speed);

  }else if(this.easy.length === 544){
    this.timer1 = setTimeout(function(){
      wordGame.easy.splice(wordGame.$easyIndex, 1);
    }, 2000);

  }else if (this.medium.length >= 73) {
    this.$speed = this.$speed - 2500;

    this.level.text('2');
    this.$mediumIndex = Math.floor(Math.random()*(this.medium).length);
    this.$currentMedWord = this.medium[this.$mediumIndex];
    this.medium.splice(this.$mediumIndex, 1);
    this.usedWordArray.push(this.$currentMedWord.toUpperCase());
    this.$blockWord = this.usedWordArray[this.usedWordArray.length-1];
    this.$block.css({'left': this.$positionX+'px', 'background-color': '#878E88'}).html(`${this.$blockWord}`).animate({'margin-top': `${$(window).height()}`},this.$speed);

  }else if(this.medium.length === 72){

    this.timer1 = setTimeout(function(){
      wordGame.medium.splice(wordGame.$mediumIndex, 1);
    }, 4000);

  }else if (this.hard.length > 0) {
    this.$speed = this.$speed - 3000;
    this.level.text('3');
    this.$hardIndex = Math.floor(Math.random()*(this.hard).length);
    this.$currentHardWord = this.hard[this.$hardIndex];
    this.hard.splice(this.$hardIndex, 1);
    this.usedWordArray.push(this.$currentHardWord.toUpperCase());
    this.$blockWord = this.usedWordArray[this.usedWordArray.length-1];
    this.$block.css({'left': this.$positionX+'px', 'background-color': '#F45D01'}).html(`${this.$blockWord}`).animate({'margin-top': `${$(window).height()}`},this.$speed);

  }else(this.end());
  return this.giveAttribute;
};

wordGame.backgroundChange = function(){
  if (this.level.text() === '2'){
    this.space.css('background-color', '#ff9966');
    this.sun.css('background-color', '#ff6666');
    this.sun.css('margin', '-180px 250px');
  }else if (this.level.text() === '3'){
    this.space.css('background-color', '#4B738E');
    this.sun.css('background-color', '#D6D5C0');
    this.sun.css('margin', '-180px 330px');
  }
};

wordGame.positionCheck = function(){
  if($('.block').length === 0){
    clearInterval(this.check);
  }else if ($('.block').offset().top >= `${$(window).height()-120}`){
    new Audio('sounds/buzzer.mp3').play();
    clearInterval(this.check);
    this.lives--;
    $('.life').first().remove();
    $(`.block`).first().remove();
    this.lifeChecker();
  }
  return;
};

wordGame.lifeChecker = function(){
  if(this.lives > 0){
    console.log(this.lives);
  }else{
    $(`.block`).remove();
    wordGame.end();
  }
};

wordGame.submitText = function(){

  this.$letterArray = $('.block').first().text().split('');
  $('.block').first().css({'background-color': '#963484'});
  this.inputText = $('.input');

  if(this.$letterArray[0] === this.inputText.val().toUpperCase()){
    new Audio('sounds/type_correct.mp3').play();
    this.inputText.val('');
    this.$letterArray.shift();
    this.$blockWord = this.$letterArray.join().replace(/,/g, '');
    this.score++;
    $('.score').text(`${this.score}`);
    $('.block').first().text(`${this.$blockWord}`);

  }else if($('.block').length === 0){
    console.log('loading');
  }else if(this.$letterArray.length === 0){
    $('.block').first().remove();
    new Audio('sounds/Blop-Mark_DiAngelo-79054334.wav').play();
    this.inputText.val('');

  }else if(this.$letterArray[0] !== this.inputText.val().toUpperCase() && this.inputText.val().length !== 0){
    new Audio('sounds/wrong_answer.mp3').play();
    this.inputText.val('');
  }
};

wordGame.end = function(){

  this.level.text('1');
  $('.levelLabel').css('display', 'none');
  $('.coverTwo').fadeOut(2000);
  this.space.css('background-color', '#a8b5bf');
  this.sun.css('background-color', 'orange');
  this.sun.css('margin', '-300px 180px');
  this.$block.remove();
  clearInterval(wordGame.check);
  clearInterval(wordGame.checkText);
  clearTimeout(wordGame.blockTimer);

  this.highScore = localStorage.getItem('highScore') || 0;
  if (this.score > this.highScore){
    this.highScore = parseInt(this.score);
    localStorage.setItem('highScore', this.highScore);
  }

  this.$gameOver = $('<div id = "over"/>').appendTo('.startBtn').text('GAME OVER');
  this.$highScore = $('<div id = "highScore"/>').appendTo('.startBtn').text(`HIGH SCORE: ${this.highScore}`);
  this.$playAgain = $('<div id = "start"/>').appendTo('.startBtn').text('PLAY AGAIN');
  this.$playAgain.on('click', function(){

    wordGame.newGame();
    wordGame.$playAgain.remove();
    wordGame.$gameOver.remove();
    wordGame.$highScore.remove();

  });
  return this.end;
};

$(wordGame.setUp.bind(wordGame));
