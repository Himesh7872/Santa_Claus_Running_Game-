var santa = document.getElementById("santa");
santaImageNumber = 1;
santaAnimationNumber = 0;
createSnowflakes();

function santaAnimation(){
if(santaImageNumber == 16){                                         //Idle Animation
    santaImageNumber = 1;
}
    santaImageNumber = santaImageNumber + 1;
    santa.src="idle ("+santaImageNumber+").png";
}
function santaAnimationStart(){
    santaAnimationNumber = setInterval(santaAnimation,150);
}

runImageNumber = 1;
runAnimationNumber = 0;
var runSound = new Audio("run.mp3");
runSound.loop =true;

function runAnimation(){
    runImageNumber = runImageNumber + 1;
    if(runImageNumber == 11){                                       //Run Animation
        runImageNumber = 1;
    } 
    santa.src ="run ("+runImageNumber+").png";
}
function runAnimationStart(){
    runAnimationNumber = setInterval(runAnimation,100);
    clearInterval(santaAnimationNumber);
}

jumpAnimationNumber = 0;
jumpImageNumber = 1;
santaMarginTop = 655;
var jumpSound = new Audio("jump.mp3");


function jumpAnimation(){
    jumpImageNumber = jumpImageNumber + 1;
        if(jumpImageNumber <= 9){
        santaMarginTop =santaMarginTop - 35;
        santa.style.marginTop = santaMarginTop +"px";
    }
    if(jumpImageNumber >= 9){
        santaMarginTop =santaMarginTop + 35;
        santa.style.marginTop = santaMarginTop +"px";
    }
    if(jumpImageNumber == 16){                                      //Jump Animation
        jumpImageNumber =1;
        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber =0;
        runAnimationNumber =0;
        runAnimationStart();
        runSound.play();
    }
    santa.src = "jump ("+jumpImageNumber+").png"
}
function jumpAnimationStart(){
    clearInterval(santaAnimationNumber);
    runImageNumber = 0;
    clearInterval(runAnimationNumber);
    jumpAnimationNumber =setInterval(jumpAnimation,100);
}

function keyCheck(event){    
  var keyCode=event.which;
    if(keyCode == 13){
        if(runAnimationNumber == 0){
            document.getElementById("t1").style.visibility="hidden";
            runAnimationStart();
            runSound.play();                                                        //Enter Key
    }            
        if(moveBackgroundAnimationId ==0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);
        }
        if(boxAnimationId==0){
            boxAnimationId = setInterval(boxAnimation,80);
        }
    }
    if(keyCode == 32){
        if(jumpAnimationNumber == 0){
            jumpAnimationStart();
            document.getElementById("t1").style.visibility="hidden";
            runSound.pause();
    }       
        if(moveBackgroundAnimationId ==0){
            moveBackgroundAnimationId = setInterval(moveBackground,100);            //Space Key
        }
        if(boxAnimationId==0){
            boxAnimationId = setInterval(boxAnimation,80);
    }
    jumpSound.play();
}
}
    var winSound = new Audio("win.mp3");
    var backgroundImagePositionX =0;
    var moveBackgroundAnimationId =0;
    var score = 0;
    var gameWon = false;
                                                                                                    //Background Moving
    function moveBackground(){
        backgroundImagePositionX = backgroundImagePositionX -20;
        document.getElementById("back").style.backgroundPositionX = backgroundImagePositionX +"px";
        score = score + 10;
        document.getElementById("score").innerHTML=score;

        //if (score >= 2350 && !gameWon)
            if (score >= 1300 && !gameWon) {
            gameWon = true;
            handleWin();
            winSound.play();
            runSound.loop =false;
        }
    }
    boxMarginLeft = 1950; //traps patan ganna thana 1950

    function createBoxes(){
        for(var i=0; i<= 4; i++){
        var box = document.createElement("div");
        box.className="box";                                                    //Obstacles
        document.getElementById("back").appendChild(box);
        box.style.marginLeft =boxMarginLeft +"px";
        box.id="box"+i;
            if (i<2){
                boxMarginLeft =boxMarginLeft + 750; // traps athara dura
            }
            if (i>2){
                boxMarginLeft =boxMarginLeft + 500; // traps athara dura
            }
    }
}

boxAnimationId =0;

function boxAnimation(){
    for(var i=0; i<10;i++){
        var box = document.getElementById("box"+i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-25;
        box.style.marginLeft = newMarginLeft+"px";
        if (newMarginLeft >=  -10 & newMarginLeft <=200){
            if (santaMarginTop > 610){
                clearInterval(boxAnimationId);
                clearInterval(runAnimationNumber);
                runAnimationNumber = -1;                                    //Dead Animation Play
                runSound.pause();
                clearInterval(jumpAnimationNumber);
                jumpAnimationNumber = -1;
                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;
                deadAnimationNumber = setInterval(santaDeadAnimation,100);
                deadSound.play();startSound.loop = false;
                startSound.pause();
            }
        }
    }
}

deadAnumationNumber =0;
deadImageNumber = 1;
var deadSound = new Audio("dead.mp3");

function santaDeadAnimation(){
    deadImageNumber = deadImageNumber +1;
    if(deadImageNumber == 17){                                                  //Dead Animation
        deadImageNumber = 16;
        document.getElementById("end").style.visibility="visible";
        document.getElementById("lastScore").innerHTML = score;
    }
    santa.src="Dead ("+deadImageNumber+").png";
}

function reload(){
    location.reload();
}

function handleWin() {
    startSound.loop = false;
    startSound.pause();
    document.getElementById("end2").style.visibility="visible";
    document.getElementById("winScore").innerHTML = score;                  //win eka
    clearInterval(moveBackgroundAnimationId);
    clearInterval(runAnimationNumber);
    
}

function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    const numberOfSnowflakes = 50; 
  
    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');                                     //snow eka
      const size = Math.random() * 10 + 5; 
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      snowflakesContainer.appendChild(snowflake);
    }
  }
  var startSound = new Audio("start.mp3");
  startSound.loop = true;
  startSound.volume = 0.2;

  function gameMenu() {
    document.getElementById("start").style.visibility="hidden";             //Gmae Starting Menu
    startSound.play();

  } 
  

  
  













